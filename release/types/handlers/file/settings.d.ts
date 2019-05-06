/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Responses from '../../responses';

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
  types: Responses.Types;
}
