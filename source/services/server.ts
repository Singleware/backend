/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Url from 'url';
import * as Http from 'http';

import * as Class from '@singleware/class';
import * as Observable from '@singleware/observable';

import * as Aliases from '../aliases';
import * as Requests from '../requests';

import { Settings } from './settings';
import { Helper } from './helper';

/**
 * Back-end HTTP service class.
 */
@Class.Describe()
export class Server extends Class.Null implements Aliases.Service {
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
   * Receive subject instance.
   */
  @Class.Private()
  private receiveSubject = new Observable.Subject<Aliases.Request>();

  /**
   * Send subject instance.
   */
  @Class.Private()
  private sendSubject = new Observable.Subject<Aliases.Request>();

  /**
   * Error subject instance.
   */
  @Class.Private()
  private errorSubject = new Observable.Subject<Aliases.Request>();

  /**
   * Gets an error request based on the specified Request entity.
   * @param request Request entity.
   * @returns Returns the new error request.
   */
  @Class.Private()
  private getErrorRequest(request: Aliases.Request): Aliases.Request {
    if (!request.error) {
      return request;
    }
    const { connection, method, domain, search, headers } = request.input;
    const path = `#${request.path}`;
    return Helper.getRequest(connection, method, domain, path, search, headers, {
      exception: this.settings.debug ? request.error.stack : request.error.message
    });
  }

  /**
   * Response send handler.
   * @param request Request entity.
   */
  @Class.Private()
  private async sendHandler(request: Aliases.Request): Promise<void> {
    await this.sendSubject.notifyAll(request);
  }

  /**
   * Request error handler.
   * @param request Request entity.
   * @param error Error entity.
   */
  @Class.Private()
  private async errorHandler(request: Aliases.Request, response: Http.ServerResponse, error: Error): Promise<void> {
    request.error = error;
    await this.errorSubject.notifyAll(request);
    if (!response.finished && request.input.connection.active) {
      this.responseHandler(this.getErrorRequest(request), response);
    }
  }

  /**
   * Request receive data handler.
   * @param request Request entity.
   * @param buffer Buffer chunk.
   */
  @Class.Private()
  private receiveHandler(request: Aliases.Request, buffer: string): void {
    request.input.data += buffer;
  }

  /**
   * Response event handler.
   * @param request Request entity.
   * @param response Response manager.
   */
  @Class.Private()
  private async responseHandler(request: Aliases.Request, response: Http.ServerResponse): Promise<void> {
    await this.receiveSubject.notifyAll(request);
    if (request.error) {
      this.responseHandler(this.getErrorRequest(request), response);
    } else {
      response.writeHead(request.output.status || 501, request.output.message, request.output.headers);
      if (request.output.data) {
        response.write(request.output.data);
      }
      response.end(this.sendHandler.bind(this, request));
    }
  }

  /**
   * Close event handler.
   * @param request Request entity.
   * @param response Response manager.
   */
  @Class.Private()
  private async closeHandler(request: Aliases.Request, response: Http.ServerResponse): Promise<void> {
    request.input.connection.active = false;
    if (!response.finished) {
      request.error = new Error(`Connection closed unexpectedly.`);
      await this.errorSubject.notifyAll(request);
    }
  }

  /**
   * Request event handler.
   * @param incoming Incoming message.
   * @param response Response message.
   */
  @Class.Private()
  private requestHandler(incoming: Http.IncomingMessage, response: Http.ServerResponse): void {
    const port = incoming.connection.remotePort || incoming.socket.remotePort || 0;
    const address = Helper.getRemoteAddress(incoming) || '0.0.0.0';
    const method = (incoming.method || 'GET').toUpperCase();
    const domain = Helper.getDomainName(incoming) || '.';
    const headers = incoming.headers;
    const url = Url.parse(incoming.url || '/');
    const path = url.pathname || '/';
    const search = Requests.Helper.parseURLSearch(url.search || '');
    const request = Helper.getRequest({ active: true, address: address, port: port }, method, domain, path, search, headers, {});
    incoming.on('data', this.receiveHandler.bind(this, request));
    incoming.on('error', this.errorHandler.bind(this, request, response));
    incoming.on('end', this.responseHandler.bind(this, request, response));
    response.on('close', this.closeHandler.bind(this, request, response));
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
  public get onReceive(): Observable.Subject<Aliases.Request> {
    return this.receiveSubject;
  }

  /**
   * Send response event.
   */
  @Class.Public()
  public get onSend(): Observable.Subject<Aliases.Request> {
    return this.sendSubject;
  }

  /**
   * Error response event.
   */
  @Class.Public()
  public get onError(): Observable.Subject<Aliases.Request> {
    return this.errorSubject;
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
