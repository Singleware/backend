/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Url from 'url';
import * as Class from '@singleware/class';

import { Search } from './search';

/**
 * Request helper class.
 */
@Class.Describe()
export class Helper extends Class.Null {
  /**
   * Set the response status and the response content JSON.
   * @param output Output entity.
   * @param status Output status.
   * @param message Output message.
   */
  @Class.Public()
  public static getSearchMap(search: string): Search {
    const params = new Url.URLSearchParams(search);
    const map = {} as Search;
    for (const [key, value] of params) {
      const current = map[key];
      if (current) {
        if (typeof current === 'string') {
          map[key] = [current];
        }
        (map[key] as Array<string>).push(value);
      } else {
        map[key] = value;
      }
    }
    return map;
  }
}
