/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import { Headers } from '../headers';

import { Connection } from './connection';
import { Search } from './search';

/**
 * Request input interface.
 */
export interface Input {
  /**
   * Request connection.
   */
  connection: Connection;
  /**
   * Request domain.
   */
  domain: string;
  /**
   * Request method.
   */
  method: string;
  /**
   * Request search.
   */
  search: Search;
  /**
   * Request headers.
   */
  headers: Headers;
  /**
   * Request data.
   */
  data: Buffer;
}
