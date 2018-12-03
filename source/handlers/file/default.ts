/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Fs from 'fs';
import * as Path from 'path';
import * as Util from 'util';

import * as Class from '@singleware/class';
import * as Application from '@singleware/application';

import { MIMEs } from '../../mimes';
import { Output } from '../../output';
import { Match } from '../../types';
import { Response } from '../../response';
import { Settings } from './settings';

/**
 * Default file handler class.
 */
@Class.Describe()
export class Default extends Class.Null {
  /**
   * Handler settings.
   */
  @Class.Private()
  private settings: Settings;

  /**
   * Gets the MIME type that corresponds to the extension of the specified file.
   * @param path File path.
   * @returns Returns the corresponding MIME type or undefined when the type was not found.
   */
  @Class.Protected()
  protected getMimeType(path: string): string | undefined {
    const type = Path.extname(path)
      .substring(1)
      .toLowerCase();
    if (!this.settings.strictTypes) {
      return this.settings.types[type] || 'application/octet-stream';
    }
    return this.settings.types[type];
  }

  /**
   * Read all content of the specified file.
   * @param path File path.
   * @returns Returns the file content.
   */
  @Class.Protected()
  protected async readFile(path: string): Promise<Buffer> {
    return await Util.promisify(Fs.readFile)(path);
  }

  /**
   * Test whether the specified file exists or not.
   * @param path File path.
   * @returns Returns the promise to get true when the file exists or false otherwise.
   */
  @Class.Protected()
  protected async fileExists(path: string): Promise<boolean> {
    if (!(await Util.promisify(Fs.exists)(path))) {
      return false;
    }
    return (await Util.promisify(Fs.lstat)(path)).isFile();
  }

  /**
   * Sets the content of a default error file into the give output response.
   * @param output Output response.
   * @param status Output status.
   * @param information Error information.
   */
  @Class.Protected()
  protected async setResponseError(output: Output, status: number, information: string): Promise<void> {
    const path = Path.join(Default.assetsPath, `${status}.html`);
    Response.setStatus(output, status);
    if (await this.fileExists(path)) {
      const variables = {
        '%STATUS%': status.toString(),
        '%MESSAGE%': output.message,
        '%INFORMATION%': information
      };
      const replacement = new RegExp(Object.keys(variables).join('|'), 'g');
      const template = (await this.readFile(path)).toString('utf-8');
      const content = template.replace(replacement, (match: string) => (<any>variables)[match]);
      const type = this.settings.types.html || 'text/html';
      Response.setContent(output, content, type);
    }
  }

  /**
   * Set the content of the specified file into the given output response.
   * @param output Output response.
   * @param path File path.
   */
  @Class.Protected()
  protected async setResponseFile(output: Output, path: string): Promise<void> {
    const type = this.getMimeType(path);
    const file = Path.join(this.settings.baseDirectory, Path.normalize(path));
    if (!type || !(await this.fileExists(file))) {
      await this.setResponseError(output, 404, `File '${path}' could not be found`);
    } else {
      Response.setStatus(output, 200);
      Response.setContent(output, await this.readFile(file), type);
    }
  }

  /**
   * Default constructor.
   * @param settings Handler settings.
   */
  constructor(settings: Settings) {
    super();
    this.settings = settings;
  }

  /**
   * Exception response processor.
   * @param match Matched rote.
   */
  @Class.Public()
  @Application.Processor({ path: '!', environment: { methods: '*' } })
  public async exceptionResponse(match: Match): Promise<void> {
    await this.setResponseError(match.detail.output, 500, match.detail.environment.exception);
  }

  /**
   * Default response processor.
   * @param match Matched rote.
   */
  @Class.Public()
  @Application.Processor({ path: '/', exact: false, environment: { methods: 'GET', access: {} } })
  public async defaultResponse(match: Match): Promise<void> {
    const path = match.detail.path === '/' ? Path.basename(this.settings.indexFile) : Path.normalize(match.detail.path);
    await this.setResponseFile(match.detail.output, path);
  }

  /**
   * Gets the base directory.
   */
  @Class.Public()
  public get baseDirectory(): string {
    return this.settings.baseDirectory;
  }

  /**
   * Gets the index file.
   */
  @Class.Public()
  public get indexFile(): string {
    return this.settings.indexFile;
  }

  /**
   * Gets the strict types status.
   */
  @Class.Public()
  public get strictTypes(): boolean {
    return this.settings.strictTypes || false;
  }

  /**
   * Gets the handler types.
   */
  @Class.Public()
  public get types(): MIMEs {
    return this.settings.types;
  }

  /**
   * Assets path.
   */
  @Class.Private()
  private static assetsPath: string = Path.join(__dirname, '../../../../assets/');
}
