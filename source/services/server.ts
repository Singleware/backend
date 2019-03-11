/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Http from 'http';
import * as Url from 'url';

import * as Class from '@singleware/class';
import * as Observable from '@singleware/observable';

import * as Types from '../types';
import * as Request from './request';

import { Settings } from './settings';
import { Helper } from './helper';

/**
 * Back-end HTTP service class.
 */
@Class.Describe()
export class Server extends Class.Null implements Types.Service {
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
  private receiveSubject = new Observable.Subject<Types.Request>();

  /**
   * Send subject instance.
   */
  @Class.Private()
  private sendSubject = new Observable.Subject<Types.Request>();

  /**
   * Error subject instance.
   */
  @Class.Private()
  private errorSubject = new Observable.Subject<Types.Request>();

  /**
   * Gets an error request based on the specified request information.
   * @param request Request information.
   * @returns Returns the new error request.
   */
  @Class.Private()
  private getErrorRequest(request: Types.Request): Types.Request {
    if (!request.error) {
      return request;
    }
    const input = request.input;
    return Helper.getRequest(input.address, input.port, input.method, `#${request.path}`, input.search, input.headers, {
      exception: this.settings.debug ? request.error.stack : request.error.message
    });
  }

  /**
   * Response send handler.
   * @param request Request information.
   */
  @Class.Private()
  private sendHandler(request: Types.Request): void {
    this.sendSubject.notifyAll(request);
  }

  /**
   * Request error handler.
   * @param request Request information.
   * @param error Error information.
   */
  @Class.Private()
  private errorHandler(request: Types.Request, response: Http.ServerResponse, error: Error): void {
    request.error = error;
    this.errorSubject.notifyAll(request);
    if (!response.finished) {
      this.responseHandler(this.getErrorRequest(request), response);
    }
  }

  /**
   * Request receive handler.
   * @param request Request information.
   * @param data Data chunk.
   */
  @Class.Private()
  private receiveHandler(request: Types.Request, data: string): void {
    request.input.data += data;
  }

  /**
   * Response event handler.
   * @param request Request information.
   * @param response Response manager.
   */
  @Class.Private()
  private async responseHandler(request: Types.Request, response: Http.ServerResponse): Promise<void> {
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
   * Request event handler.
   * @param incoming Incoming message.
   * @param response Response message.
   */
  @Class.Private()
  private requestHandler(incoming: Http.IncomingMessage, response: Http.ServerResponse): void {
    const url = Url.parse(incoming.url || '/');
    const address = Helper.getRemoteAddress(incoming) || '0.0.0.0';
    const port = incoming.connection.remotePort || incoming.socket.remotePort || 0;
    const method = (incoming.method || 'GET').toUpperCase();
    const path = url.pathname || '/';
    const search = Request.Helper.getURLSearch(url.search || '');
    const request = Helper.getRequest(address, port, method, path, search, incoming.headers, {});
    incoming.on('data', this.receiveHandler.bind(this, request));
    incoming.on('error', this.errorHandler.bind(this, request, response));
    incoming.on('end', this.responseHandler.bind(this, request, response));
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
  public get onReceive(): Observable.Subject<Types.Request> {
    return this.receiveSubject;
  }

  /**
   * Send response event.
   */
  @Class.Public()
  public get onSend(): Observable.Subject<Types.Request> {
    return this.sendSubject;
  }

  /**
   * Error response event.
   */
  @Class.Public()
  public get onError(): Observable.Subject<Types.Request> {
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
