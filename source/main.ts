/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Application from '@singleware/application';

import * as Security from './security';
import * as Response from './services/response';
import * as Request from './services/request';

import { Callable, Variables } from './types';
import { Settings } from './settings';

/**
 * Back-end application class.
 */
@Class.Describe()
export class Main extends Application.Main<Request.Input, Response.Output> {
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
  protected setSecurityHeaders(output: Response.Output, input: Request.Input, variables: Variables): void {
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
  protected async processHandler(match: Application.Match<Request.Input, Response.Output>, callback: Callable): Promise<void> {
    const methods = match.variables.methods;
    const output = match.detail.output;
    const input = match.detail.input;
    this.setSecurityHeaders(output, input, match.variables);
    if ((methods instanceof Array && methods.indexOf(input.method) !== -1) || methods === input.method || methods === '*') {
      await super.processHandler(match, callback);
    } else if (input.method === 'OPTIONS') {
      Response.Helper.setStatus(output, 204);
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
   * Set the CORS headers.
   * @param output Output information.
   * @param cors CORS information.
   */
  @Class.Protected()
  protected static setCORS(output: Response.Output, input: Request.Input, cors: Security.CORS): void {
    Response.Helper.setMultiHeaders(output, {
      'Access-Control-Allow-Origin': cors.allowOrigin || <string>input.headers['origin'],
      'Access-Control-Allow-Methods': cors.allowMethods || ['HEAD', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      'Access-Control-Allow-Credentials': cors.allowCredentials ? 'true' : 'false',
      'Access-Control-Allow-Headers': cors.allowHeaders,
      'Access-Control-Expose-Headers': cors.exposeHeaders,
      'Access-Control-Max-Age': cors.maxAge !== void 0 ? `${cors.maxAge}` : void 0
    });
  }

  /**
   * Set the HSTS headers.
   * @param output Output information.
   * @param hsts HSTS information.
   */
  @Class.Protected()
  protected static setHSTS(output: Response.Output, hsts: Security.HSTS): void {
    let value = `max-age=${hsts.maxAge}`;
    if (hsts.option) {
      value += `; ${hsts.option}`;
    }
    Response.Helper.setHeader(output, 'Strict-Transport-Security', value);
  }
}
