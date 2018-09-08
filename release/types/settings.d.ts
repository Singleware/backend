/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Security from './security';

/**
 * Application settings.
 */
export interface Settings {
  /**
   * Cross-Origin Request Sharing.
   */
  CrossOriginRequestSharing?: Security.CORS;
  /**
   * HTTP Strict Transport Security.
   */
  StrictTransportSecurity?: Security.HSTS;
}
