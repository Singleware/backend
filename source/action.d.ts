/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Application from '@singleware/application';

import { Environment } from './environment';

/**
 * Application actions interface.
 */
export interface Action extends Application.Action {
  /**
   * Action environment.
   */
  environment?: Environment;
}
