/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Aliases from '../../aliases';
import * as Responses from '../../responses';

import { Settings } from './settings';
import { Policy } from './policy';

/**
 * CSP helper class.
 */
@Class.Describe()
export class Helper extends Class.Null {
  /**
   * Build and get the concatenated policy values from the specified list of polices.
   * @param list List of polices.
   * @returns Returns the policy values or undefined when the policy list is empty.
   */
  @Class.Private()
  private static buildConcatenatedPolices(list: Policy[]): string | undefined {
    const polices = [];
    for (const policy of list) {
      const value = policy.value instanceof Array ? policy.value.join(' ') : policy.value;
      polices.push(`${policy.name} ${value}`);
    }
    return polices.length > 0 ? polices.join('; ') : void 0;
  }

  /**
   * Set all the CSP headers in the specified request.
   * @param request Request information.
   * @param settings CSP settings.
   */
  @Class.Public()
  public static setHeaders(request: Aliases.Request, settings: Settings): void {
    Responses.Helper.setMultipleHeaders(request.output, {
      'Content-Security-Policy': this.buildConcatenatedPolices(settings.polices),
      'Content-Security-Policy-Report-Only': settings.reportPolices ? this.buildConcatenatedPolices(settings.reportPolices) : void 0
    });
  }
}
