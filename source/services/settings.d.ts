/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Service settings interface.
 */
export interface Settings {
  /**
   * Listen port.
   */
  port: number;
  /**
   * Listen host.
   */
  host?: string;
  /**
   * Max concurrent connections.
   */
  limit?: number;
  /**
   * Determines whether the server must exposes any exception in the response.
   */
  debug?: boolean;
}
