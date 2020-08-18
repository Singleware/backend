/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
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
   * Generate a new map containing all search parameters from the specified search string.
   * @param search Search string.
   * @returns Returns the map containing all parameters parsed from the given search string.
   */
  @Class.Public()
  public static parseURLSearch(search: string): Search {
    const params = new Url.URLSearchParams(search);
    const map = <Search>{};
    for (const [key, value] of params) {
      const current = map[key];
      if (current !== void 0) {
        if (current instanceof Array) {
          current.push(value);
        } else {
          map[key] = [current, value];
        }
      } else {
        map[key] = value;
      }
    }
    return map;
  }

  /**
   * Generate a new string containing all search parameters from the specified search map.
   * @param search Search map.
   * @returns Returns the string corresponding to the given search map.
   */
  @Class.Public()
  public static stringfyURLSearch(search: Search): string {
    const params = [];
    for (const [key, value] of Object.entries(search)) {
      if (value instanceof Array) {
        for (const current of value) {
          if (current.length > 0) {
            params.push(`${key}=${encodeURI(current)}`);
          } else {
            params.push(`${key}`);
          }
        }
      } else if (value.length > 0) {
        params.push(`${key}=${encodeURI(value)}`);
      } else {
        params.push(`${key}`);
      }
    }
    return params.join('&');
  }
}
