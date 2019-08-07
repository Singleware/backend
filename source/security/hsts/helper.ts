/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Aliases from '../../aliases';
import * as Responses from '../../responses';

import { Settings } from './settings';

/**
 * HSTS helper class.
 */
@Class.Describe()
export class Helper extends Class.Null {
  /**
   * Set all the HSTS headers in the specified request.
   * @param request Request information.
   * @param settings HSTS settings.
   */
  @Class.Public()
  public static setHeaders(request: Aliases.Request, settings: Settings): void {
    const values = [`max-age=${settings.maxAge}`];
    if (settings.includeSubDomains) {
      values.push('includeSubDomains');
    }
    if (settings.preload) {
      values.push('preload');
    }
    Responses.Helper.setMultipleHeaders(request.output, {
      'Strict-Transport-Security': values.join('; ')
    });
  }
}
