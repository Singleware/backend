/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Backend from '../../source';

/**
 * External handler, example class.
 */
@Class.Describe()
export class Handler extends Backend.Handlers.Json.Default {
  /**
   * Error processor.
   * @param match Request match.
   */
  @Class.Public()
  @Backend.Processor({ path: '#', exact: false, environment: { methods: '*' } })
  public errorProcessor(match: Backend.Types.Match): void {
    super.exceptionResponse(match);
  }

  /**
   * Default processor.
   * @param match Request match.
   */
  @Class.Public()
  @Backend.Processor({ path: '/', exact: false, environment: { methods: '*' } })
  public defaultProcessor(match: Backend.Types.Match): void {
    super.defaultResponse(match);
  }

  /**
   * List tests, request processor.
   * @param match Request match.
   */
  @Class.Public()
  @Backend.Processor({ path: '/tests', environment: { methods: 'GET' } })
  public listProcessor(match: Backend.Types.Match): void {
    Backend.Responses.Helper.setStatusJson(match.detail.output, 200);
  }

  /**
   * Create test, request processor.
   * @param match Request match.
   */
  @Class.Public()
  @Backend.Processor({ path: '/tests', environment: { methods: 'POST' } })
  public createProcessor(match: Backend.Types.Match): void {
    Backend.Responses.Helper.setStatusJson(match.detail.output, 201);
  }

  /**
   * Read test, request processor.
   * @param match Request match.
   */
  @Class.Public()
  @Backend.Processor({ path: '/tests/{id}', constraint: { id: /[0-9]*/ }, environment: { methods: 'GET' } })
  public readProcessor(match: Backend.Types.Match): void {
    Backend.Responses.Helper.setStatusJson(match.detail.output, 200);
  }

  /**
   * Update test, request processor.
   * @param match Request match.
   */
  @Class.Public()
  @Backend.Processor({ path: '/tests/{id}', constraint: { id: /[0-9]*/ }, environment: { methods: 'PATCH' } })
  public updateProcessor(match: Backend.Types.Match): void {
    Backend.Responses.Helper.setStatusJson(match.detail.output, 200);
  }

  /**
   * Delete test, request processor.
   * @param match Request match.
   */
  @Class.Public()
  @Backend.Processor({ path: '/tests/{id}', constraint: { id: /[0-9]*/ }, environment: { methods: 'DELETE' } })
  public deleteProcessor(match: Backend.Types.Match): void {
    Backend.Responses.Helper.setStatusJson(match.detail.output, 200);
  }
}
