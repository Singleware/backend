/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Http from 'http';

import * as Class from '@singleware/class';

import * as Types from '../aliases';
import * as Requests from '../requests';

import { Headers } from '../headers';

/**
 * Services helper class.
 */
@Class.Describe()
export class Helper extends Class.Null {
  /**
   * Get the first header value from the specified header.
   * @param header Header.
   * @returns Returns the first header value or undefined when there's no header value.
   */
  @Class.Private()
  private static getFirstHeaderValue(header: string | string[] | undefined): string | undefined {
    if (header instanceof Array) {
      return this.getFirstHeaderValue(header.shift());
    }
    if (header !== void 0) {
      const value = header.split(',').shift();
      if (value !== void 0) {
        return value.trim();
      }
    }
    return void 0;
  }

  /**
   * Gets the requested domain name.
   * @param incoming Incoming message.
   * @returns Returns the requested domain name or undefined when there's no incoming host header.
   */
  @Class.Public()
  public static getDomainName(incoming: Http.IncomingMessage): string | undefined {
    return this.getFirstHeaderValue(incoming.headers['host']);
  }

  /**
   * Get the remote address from the specified incoming message.
   * @param incoming Incoming message.
   * @returns Returns the remote address from the incoming message or undefined when there is no remote address.
   */
  @Class.Public()
  public static getRemoteAddress(incoming: Http.IncomingMessage): string | undefined {
    return (
      <string>this.getFirstHeaderValue(incoming.headers['x-forwarded-for']) ||
      incoming.connection.remoteAddress ||
      incoming.socket.remoteAddress
    );
  }

  /**
   * Get the remote port from the specified incoming message.
   * @param incoming Incoming message.
   * @returns Returns the remote port from the incoming message or undefined when there is no remote port.
   */
  @Class.Public()
  public static getRemotePort(incoming: Http.IncomingMessage): number | undefined {
    return (
      parseInt(<string>this.getFirstHeaderValue(incoming.headers['x-forwarded-port'])) ||
      incoming.connection.remotePort ||
      incoming.socket.remotePort
    );
  }

  /**
   * Get a new request with the specified parameters.
   * @param connection Request connection.
   * @param method Request method.
   * @param domain Request domain.
   * @param path Request path
   * @param search Request search parameters.
   * @param headers Request headers.
   * @param variables Request variables.
   * @returns Returns the new request information.
   */
  @Class.Public()
  public static getRequest(
    connection: Requests.Connection,
    method: string,
    domain: string,
    path: string,
    search: Requests.Search,
    headers: Headers,
    variables: Types.Variables
  ): Types.Request {
    return {
      path: path,
      input: {
        connection: connection,
        method: method,
        domain: domain,
        search: search,
        headers: headers,
        data: Buffer.alloc(0)
      },
      output: {
        status: 501,
        message: 'Not Implemented',
        headers: {},
        data: void 0
      },
      environment: {
        local: {
          ...variables
        },
        shared: {}
      },
      granted: true
    };
  }
}
