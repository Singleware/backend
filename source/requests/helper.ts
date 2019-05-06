/*
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
   * Gets one map containing all search parameters from the specified search string.
   * @param search Search string.
   * @returns Returns the map containing all parameters acquired from the given search string.
   */
  @Class.Public()
  public static parseURLSearch(search: string): Search {
    const params = new Url.URLSearchParams(search);
    const map = <Search>{};
    for (const [key, value] of params) {
      const current = map[key];
      if (current) {
        if (typeof current === 'string') {
          map[key] = [current];
        }
        (<string[]>map[key]).push(value);
      } else {
        map[key] = value;
      }
    }
    return map;
  }
}
