/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import { MIMEs } from '../../mimes';

/**
 * File handler settings.
 */
export interface Settings {
  /**
   * Index filename.
   */
  indexFile: string;
  /**
   * Base directory path.
   */
  baseDirectory: string;
  /**
   * Determines whether only defined MIME types must be send or not.
   */
  strictTypes?: boolean;
  /**
   * MIME types by extension.
   */
  types: MIMEs;
}
