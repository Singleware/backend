/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Logger entry, status interface.
 */
export interface Status {
  /**
   * Process status.
   */
  process: boolean;
  /**
   * Error status.
   */
  error: boolean;
  /**
   * Send status.
   */
  send: boolean;
}
