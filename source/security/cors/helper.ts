/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Types from '../../types';
import * as Responses from '../../responses';

import { Settings } from './settings';

/**
 * CORS helper class.
 */
@Class.Describe()
export class Helper extends Class.Null {
  /**
   * Set all the CORS headers in the specified request.
   * @param request Request information.
   * @param settings CORS settings.
   */
  @Class.Public()
  public static setHeaders(request: Types.Request, settings: Settings): void {
    Responses.Helper.setMultipleHeaders(request.output, {
      'Access-Control-Allow-Origin': settings.allowOrigin || <string>request.input.headers['origin'],
      'Access-Control-Allow-Methods': (settings.allowMethods || ['HEAD', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']).join(', '),
      'Access-Control-Allow-Credentials': settings.allowCredentials ? 'true' : 'false',
      'Access-Control-Allow-Headers': settings.allowHeaders ? settings.allowHeaders.join(', ') : void 0,
      'Access-Control-Expose-Headers': settings.exposeHeaders ? settings.exposeHeaders.join(', ') : void 0,
      'Access-Control-Max-Age': settings.maxAge
    });
  }
}
