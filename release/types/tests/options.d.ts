/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Aliases from '../aliases';
import * as Requests from '../requests';

import { Headers } from '../headers';

/**
 * Test options interface.
 */
export interface Options {
  /**
   * Request connection.
   */
  connection?: Requests.Connection;
  /**
   * Request environment.
   */
  environment?: Aliases.Environment;
  /**
   * Request path.
   */
  path?: string;
  /**
   * Request remaining path.
   */
  remaining?: string;
  /**
   * Request search.
   */
  search?: Requests.Search;
  /**
   * Request method.
   */
  method?: string;
  /**
   * Request headers.
   */
  headers?: Headers;
  /**
   * Request data.
   */
  data?: string;
}
