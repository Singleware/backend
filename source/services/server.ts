/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Http from 'http';
import * as Url from 'url';
import * as Net from 'net';

import * as Class from '@singleware/class';
import * as Observable from '@singleware/observable';

import { Request, Service } from '../types';
import { Headers } from '../headers';
import { Settings } from './settings';

/**
 * Back-end HTTP service class.
 */
@Class.Describe()
export class Server extends Class.Null implements Service {
  /**
   * HTTP server.
   */
  @Class.Private()
  private server: Http.Server;

  /**
   * Service settings.
   */
  @Class.Private()
  private settings: Settings;

  /**
   * Service events.
   */
  @Class.Private()
  private events = {
    receive: new Observable.Subject<Request>(),
    send: new Observable.Subject<Request>(),
    error: new Observable.Subject<Request>()
  };

  /**
   * Create an unprocessed request with the specified parameters.
   * @param path Request path
   * @param method Request method.
   * @param address Request address.
   * @param headers Request headers.
   * @returns Returns the created request object.
   */
  @Class.Private()
  private createRequest(path: string, method: string, address: string, headers: Headers): Request {
    return {
      path: path,
      input: {
        method: method,
        address: address,
        headers: headers,
        data: ''
      },
      output: {
        status: 0,
        message: '',
        headers: {},
        data: ''
      },
      environment: {}
    };
  }

  /**
   * Request event handler
   * @param request Request message.
   * @param response Response message.
   */
  @Class.Private()
  private requestHandler(incoming: Http.IncomingMessage, response: Http.ServerResponse): void {
    const path = Url.parse(incoming.url || '/').pathname || '/';
    const method = (incoming.method || 'GET').toUpperCase();
    const address = (<Net.AddressInfo>incoming.connection.address()).address;
    const request = this.createRequest(path, method, address, incoming.headers);
    incoming.on('data', (chunk: string) => (request.input.data += chunk));
    incoming.on('end', () => this.responseHandler(request, response));
  }

  /**
   * Response event handler.
   * @param request Request information.
   * @param response Response manager.
   */
  @Class.Private()
  private async responseHandler(request: Request, response: Http.ServerResponse): Promise<void> {
    try {
      await this.events.receive.notifyAll(request);
    } catch (exception) {
      const input = request.input;
      request.environment.exception = exception;
      await this.events.error.notifyAll(request);
      request = this.createRequest('!', input.method, input.address, input.headers);
      request.environment.exception = this.settings.debug ? exception.stack : exception.message;
      await this.events.receive.notifyAll(request);
    } finally {
      const output = request.output;
      response.writeHead(output.status || 501, output.message || 'Not Implemented', output.headers);
      response.end(output.data, () => this.events.send.notifyAll(request));
    }
  }

  /**
   * Default constructor.
   * @param settings Application settings.
   */
  constructor(settings: Settings) {
    super();
    this.settings = settings;
    this.server = Http.createServer(this.requestHandler.bind(this));
  }

  /**
   * Receive request event.
   */
  @Class.Public()
  public get onReceive(): Observable.Subject<Request> {
    return this.events.receive;
  }

  /**
   * Send response event.
   */
  @Class.Public()
  public get onSend(): Observable.Subject<Request> {
    return this.events.send;
  }

  /**
   * Error response event.
   */
  @Class.Public()
  public get onError(): Observable.Subject<Request> {
    return this.events.error;
  }

  /**
   * Starts the service listening.
   */
  @Class.Public()
  public start(): void {
    this.server.listen(this.settings.port, this.settings.host, this.settings.limit);
  }

  /**
   * Stops the service listening.
   */
  @Class.Public()
  public stop(): void {
    this.server.close();
  }
}
