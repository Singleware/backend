/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Pipeline from '@singleware/pipeline';

import * as Aliases from '../aliases';
import * as Services from '../services';
import * as Requests from '../requests';

import { Options } from './options';
import { Headers } from '../headers';

/**
 * Tests helper class.
 */
@Class.Describe()
export class Helper extends Class.Null {
  /**
   * Default request options.
   */
  @Class.Private()
  private static defaultOptions = <Options>{
    connection: {
      active: false,
      address: '0.0.0.0',
      port: 0
    },
    environment: {
      local: {},
      shared: {}
    },
    path: '',
    remaining: '',
    search: {},
    method: 'GET',
    headers: {},
    data: ''
  };

  /**
   * Creates a new fake application request based on the specified options.
   * @param options Request options.
   * @returns Returns the generated application request.
   */
  @Class.Private()
  private static getRequest(options: Options): Aliases.Request {
    const request = Services.Helper.getRequest(
      <Requests.Connection>options.connection,
      <string>options.method,
      <string>options.path,
      <Requests.Search>options.search,
      <Headers>options.headers,
      (<Aliases.Environment>options.environment).local
    );
    request.input.data = <string>options.data;
    request.environment.shared = (<Aliases.Environment>options.environment).shared;
    return request;
  }

  /**
   * Creates a new fake request matching for test purposes.
   * @param options Request options.
   * @returns Returns the generated request matching.
   */
  @Class.Public()
  public static createMatch(options?: Options): Aliases.Match {
    const current = { ...this.defaultOptions, ...options };
    const request = this.getRequest(current);
    return new Aliases.Match(request.path, <string>current.remaining, [request.environment.local], request, new Pipeline.Subject());
  }
}
