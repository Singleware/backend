/**
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Security from './security';

/**
 * Application settings.
 */
export interface Settings {
  /**
   * Default settings for Content Security Policy.
   */
  contentSecurityPolicy?: Security.CSP.Settings;
  /**
   * Default settings for Cross-Origin Request Sharing.
   */
  crossOriginRequestSharing?: Security.CORS.Settings;
  /**
   * Default settings for HTTP Strict Transport Security.
   */
  httpStrictTransportSecurity?: Security.HSTS.Settings;
}
