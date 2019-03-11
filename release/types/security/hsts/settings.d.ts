/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Settings for HTTP Strict Transport Security.
 */
export interface Settings {
  /**
   * Max age in seconds that the browser should remember that the access only to be by HTTPS.
   */
  maxAge: number;
  /**
   * Determines whether the rule should include sub domains.
   */
  includeSubDomains?: boolean;
  /**
   * Preload flag.
   */
  preload?: boolean;
}
