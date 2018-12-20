/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * HTTP Strict Transport Security headers.
 */
export interface HSTS {
  /**
   * Max age in seconds that the browser should remember that the access only to be by HTTPS.
   */
  maxAge: number;
  /**
   * Option rules.
   */
  option?: 'includeSubDomains' | 'preload ';
}
