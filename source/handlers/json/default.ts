/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Application from '@singleware/application';

import * as Response from '../../services/response';
import * as Types from '../../types';

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
  @Application.Processor({ path: '#', exact: false, environment: { methods: '*' } })
  public exceptionResponse(match: Types.Match) {
    Response.Helper.setStatusJson(match.detail.output, 500, match.detail.environment.exception);
  }

  /**
   * Default response processor.
   * @param match Matched route.
   */
  @Class.Public()
  @Application.Processor({ path: '/', exact: false, environment: { methods: '*' } })
  public async defaultResponse(match: Types.Match): Promise<void> {
    Response.Helper.setStatusJson(match.detail.output, 501);
  }
}
