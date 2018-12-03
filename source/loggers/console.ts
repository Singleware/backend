/**
 * Copyright (C) 2018 Silas B. Domingos
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
   * Gets the request header from the specified request information.
   * @param type Header type.
   * @param request Request information.
   * @returns Returns the request header.
   */
  @Class.Private()
  private getHeader(type: string, request: Request): string {
    return `${new Date().toLocaleString()} [${type}] ${request.input.address}\t${request.input.method}\t${request.path}`;
  }

  /**
   * Receive handler.
   * @param request Request information.
   */
  @Class.Public()
  public onReceive(request: Request): void {
    console.log(`${this.getHeader('R', request)}`);
  }

  /**
   * Process handler.
   * @param request Request information.
   */
  @Class.Public()
  public onProcess(request: Request): void {
    console.log(`${this.getHeader('P', request)}`);
  }

  /**
   * Send handler.
   * @param request Request information.
   */
  @Class.Public()
  public onSend(request: Request): void {
    console.log(`${this.getHeader('S', request)}`);
  }

  /**
   * Error handler.
   * @param request Request information.
   */
  @Class.Public()
  public onError(request: Request): void {
    console.log(`${this.getHeader('E', request)}`);
    console.log(request.environment.exception);
  }
}
