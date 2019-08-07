/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Application from '@singleware/application';

import * as Aliases from '../../aliases';
import * as Responses from '../../responses';

import { Headers } from '../../headers';
import { Settings } from './settings';

/**
 * Default JSON handler class.
 */
@Class.Describe()
export class Default extends Class.Null {
  /**
   * Handler settings.
   */
  @Class.Private()
  private settings: Settings;

  /**
   * Sets the specified output with the given response status, code and text.
   * @param output Output entity.
   * @param status Output status.
   * @param code Optional output code.
   * @param text Optional output text.
   */
  @Class.Protected()
  protected setResponseStatus(output: Responses.Output, status: number, code?: number, text?: string): void {
    Responses.Helper.setStatusJson(output, status, code, text);
  }

  /**
   * Sets the specified output with the given response status and content.
   * @param output Output entity.
   * @param status Output status.
   * @param content Output content.
   */
  @Class.Protected()
  protected setResponseContent<T extends Object>(output: Responses.Output, status: number, content: T): void {
    Responses.Helper.setContentJson(output, content);
    Responses.Helper.setStatus(output, status);
  }

  /**
   * Sets the specified output with the given response status and headers.
   * @param output Output entity.
   * @param status Output status.
   * @param headers Output headers.
   */
  @Class.Protected()
  protected setResponseHeaders(output: Responses.Output, status: number, headers: Headers): void {
    Responses.Helper.setMultipleHeaders(output, headers);
    Responses.Helper.setStatus(output, status);
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
   * @param match Matched route.
   */
  @Class.Public()
  @Application.Processor({ path: '#', exact: false, environment: { methods: '*' } })
  public async exceptionResponse(match: Aliases.Match): Promise<void> {
    this.setResponseStatus(match.detail.output, 500, 500, match.detail.environment.local.exception);
  }

  /**
   * Default response processor.
   * @param match Matched route.
   */
  @Class.Public()
  @Application.Processor({ path: '/', exact: false, environment: { methods: '*' } })
  public async defaultResponse(match: Aliases.Match): Promise<void> {
    this.setResponseStatus(match.detail.output, 501);
  }
}
