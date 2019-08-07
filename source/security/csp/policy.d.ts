/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Policy for Content Security Police.
 */
export interface Policy {
  /**
   * Policy name.
   */
  name:
    | 'base-uri'
    | 'child-src'
    | 'connect-src'
    | 'default-src'
    | 'font-src'
    | 'form-action'
    | 'frame-ancestors'
    | 'frame-src'
    | 'img-src'
    | 'media-src'
    | 'object-src'
    | 'plugin-types'
    | 'report-uri'
    | 'sandbox'
    | 'script-src'
    | 'style-src';
  /**
   * Policy value.
   */
  value: string | string[];
}
