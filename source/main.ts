/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Application from '@singleware/application';

import * as Security from './security';
import { Callable, Variables } from './types';
import { Settings } from './settings';
import { Response } from './response';
import { Input } from './input';
import { Output } from './output';

/**
 * Back-end application class.
 */
@Class.Describe()
export class Main extends Application.Main<Input, Output> {
  /**
   * Application settings.
   */
  @Class.Protected()
  protected settings: Settings;

  /**
   * Set all security headers into the output.
   * @param output Output information.
   * @param input Input information.
   * @param variables Route variables.
   */
  @Class.Protected()
  protected setSecurityHeaders(output: Output, input: Input, variables: Variables): void {
    if (this.settings.CrossOriginRequestSharing || variables.CORS) {
      Main.setCORS(output, input, { ...this.settings.CrossOriginRequestSharing, ...variables.CORS });
    }
    if (this.settings.StrictTransportSecurity || variables.HSTS) {
      Main.setHSTS(output, { ...this.settings.StrictTransportSecurity, ...variables.HSTS });
    }
  }

  /**
   * Process event handler.
   * @param match Matched routes.
   * @param callback Handler callback.
   */
  @Class.Protected()
  protected async processHandler(match: Application.Match<Input, Output>, callback: Callable): Promise<void> {
    const methods = match.variables.methods;
    const output = match.detail.output;
    const input = match.detail.input;
    this.setSecurityHeaders(output, input, match.variables);
    if ((methods instanceof Array && methods.indexOf(input.method) !== -1) || methods === input.method || methods === '*') {
      await super.processHandler(match, callback);
    } else if (input.method === 'OPTIONS') {
      Response.setStatus(output, 204);
    } else {
      await match.next();
    }
  }

  /**
   * Default constructor.
   * @param settings Application settings.
   */
  constructor(settings: Settings) {
    super({
      separator: '/',
      variable: /^\{([a-z_0-9]+)\}$/
    });
    this.settings = settings;
  }

  /**
   * Gets the current timestamp value in seconds.
   * @param increment Incremental seconds.
   * @returns Returns the sum of current timestamp and the incremental seconds.
   */
  @Class.Protected()
  protected static getTimestamp(increment: number): number {
    return Math.trunc(new Date().getTime() / 1000) + increment;
  }

  /**
   * Set the CORS headers.
   * @param output Output information.
   * @param cors CORS information.
   */
  @Class.Protected()
  protected static setCORS(output: Output, input: Input, cors: Security.CORS): void {
    Response.setMultiHeaders(output, {
      'Access-Control-Allow-Origin': cors.allowOrigin || <string>input.headers['origin'],
      'Access-Control-Allow-Methods': cors.allowMethods || ['HEAD', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      'Access-Control-Allow-Credentials': cors.allowCredentials ? 'true' : 'false',
      'Access-Control-Allow-Headers': cors.allowHeaders,
      'Access-Control-Expose-Headers': cors.exposeHeaders,
      'Access-Control-Max-Age': cors.maxAge !== void 0 ? `${Main.getTimestamp(cors.maxAge)}` : void 0
    });
  }

  /**
   * Set the HSTS headers.
   * @param output Output information.
   * @param hsts HSTS information.
   */
  @Class.Protected()
  protected static setHSTS(output: Output, hsts: Security.HSTS): void {
    const maxAge = Main.getTimestamp(hsts.maxAge);
    const option = hsts.option ? `; ${hsts.option}` : '';
    Response.setHeader(output, 'Strict-Transport-Security', `max-age=${maxAge}${option}`);
  }
}
