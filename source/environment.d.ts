/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Application from '@singleware/application';

import * as CSP from './security/csp';
import * as CORS from './security/cors';
import * as HSTS from './security/hsts';

/**
 * Application environment interface.
 */
export interface Environment extends Application.Variables {
  /**
   * Allowed methods for this action.
   */
  methods: string | string[];
  /**
   * Settings for Content Security Policy in this action.
   */
  contentSecurityPolicy?: CSP.Settings;
  /**
   * Settings for Cross-Origin Request Sharing in this action.
   */
  crossOriginRequestSharing?: CORS.Settings;
  /**
   * Settings for HTTP Strict Transport Security in this action.
   */
  httpStrictTransportSecurity?: HSTS.Settings;
}
