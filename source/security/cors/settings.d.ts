/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Settings for Cross-Origin Request Sharing (CORS).
 */
export interface Settings {
  /**
   * Determines whether the credentials must be provided or not.
   */
  allowCredentials?: boolean;
  /**
   * Allowed origin.
   */
  allowOrigin?: string;
  /**
   * Allowed methods.
   */
  allowMethods?: string[];
  /**
   * Allowed headers.
   */
  allowHeaders?: string[];
  /**
   * Exposed headers.
   */
  exposeHeaders?: string[];
  /**
   * Max age in seconds for preflight cache.
   */
  maxAge?: number;
}
