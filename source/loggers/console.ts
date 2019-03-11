/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Request, Logger } from '../types';

/**
 * Back-end HTTP logger class.
 */
@Class.Describe()
export class Console extends Class.Null implements Logger {
  /**
   * Gets the a new header for the specified type.
   * @param type Header type.
   * @returns Returns the new header.
   */
  @Class.Private()
  private getHeader(type: string): string {
    const time = new Date();
    const date = `${time.getUTCMonth()}-${time.getUTCDate()}-${time.getUTCFullYear()}`;
    const hour = `${time.getUTCHours()}:${time.getUTCMinutes()}:${time.getUTCSeconds()}`;
    return `${date} ${hour} ${type.padEnd(7)}`;
  }

  /**
   * Gets the a new request data for the specified request information.
   * @param request Request information.
   * @returns Returns the new request header.
   */
  @Class.Private()
  private getRequest(request: Request): string {
    const address = request.input.address;
    const port = request.input.port;
    const method = request.input.method;
    const status = request.output.status;
    return `${address} ${port.toString().padEnd(5)} ${method} ${status} ${request.path}`;
  }

  /**
   * Receive handler.
   * @param request Request information.
   */
  @Class.Public()
  public onReceive(request: Request): void {
    console.log(`${this.getHeader('Receive')} ${this.getRequest(request)}`);
  }

  /**
   * Process handler.
   * @param request Request information.
   */
  @Class.Public()
  public onProcess(request: Request): void {
    console.log(`${this.getHeader('Process')} ${this.getRequest(request)}`);
  }

  /**
   * Send handler.
   * @param request Request information.
   */
  @Class.Public()
  public onSend(request: Request): void {
    console.log(`${this.getHeader('Send')} ${this.getRequest(request)}`);
  }

  /**
   * Error handler.
   * @param request Request information.
   */
  @Class.Public()
  public onError(request: Request): void {
    console.log(`${this.getHeader('Error')} ${this.getRequest(request)} "${(<Error>request.error).message}"`);
  }

  /**
   * Start handler.
   */
  @Class.Public()
  public onStart(): void {
    console.log(`${this.getHeader('Start')}`);
  }

  /**
   * Stop handler.
   */
  @Class.Public()
  public onStop(): void {
    console.log(`${this.getHeader('Stop')}`);
  }
}
