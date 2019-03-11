/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import { Policy } from './policy';

/**
 * Settings for Content Security Police.
 */
export interface Settings {
  /**
   * Policy list.
   */
  polices: Policy[];
  /**
   * Policy list for the report only header.
   */
  reportPolices?: Policy[];
}
