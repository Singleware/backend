/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Application from '@singleware/application';

import { Match } from '../../types';
import { Response } from '../../response';
import { Settings } from './settings';

/**
 * Default JSON handler class.
 */
@Class.Describe()
export class Default extends Class.Null {
  /**
   * Handler settings.
   */
  @Class.Private() private settings: Settings;

  /**
   * Default constructor.
   * @param settings Handler settings.
   */
  constructor(settings: Settings) {
    super();
    this.settings = settings;
  }

  /**
   * Exception response processor.
   * @param match Matched route.
   */
  @Class.Public()
  @Application.Processor({ path: '!', environment: { methods: '*' } })
  public exceptionResponse(match: Match) {
    Response.setStatusJson(match.detail.output, 500, match.detail.environment.exception);
  }

  /**
   * Default response processor.
   * @param match Matched route.
   */
  @Class.Public()
  @Application.Processor({ path: '/', exact: false, environment: { methods: '*', access: {} } })
  public async defaultResponse(match: Match): Promise<void> {
    Response.setStatusJson(match.detail.output, 501);
  }
}
