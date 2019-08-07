/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Aliases from '../aliases';
import * as Requests from '../requests';

import { Entry } from './entry';

/**
 * Back-end HTTP logger class.
 */
@Class.Describe()
export class Console extends Class.Null implements Aliases.Logger {
  /**
   * Map of request entries.
   */
  @Class.Private()
  private entryMap = new WeakMap<Requests.Input, Entry>();

  /**
   * Gets the specified value filled by the given digit character and the minimum length.
   * @param value Input value.
   * @param length Minimum length
   * @param digit Digit character.
   * @returns Returns the filled string.
   */
  @Class.Private()
  private getFilledValue(value: number | string, length: number, digit: string): string {
    return value.toString().padStart(length, digit[0]);
  }

  /**
   * Gets the current time string.
   * @returns Returns the current time string.
   */
  @Class.Private()
  private getCurrentTime(): string {
    const time = new Date();
    const year = time.getUTCFullYear();
    const month = this.getFilledValue(time.getUTCMonth() + 1, 2, '0');
    const date = this.getFilledValue(time.getUTCDate(), 2, '0');
    const hour = this.getFilledValue(time.getUTCHours(), 2, '0');
    const minute = this.getFilledValue(time.getUTCMinutes(), 2, '0');
    const second = this.getFilledValue(time.getUTCSeconds(), 2, '0');
    return `${year}-${month}-${date}T${hour}:${minute}:${second}Z`;
  }

  /**
   * Gets the difference between the specified time and the current time.
   * @param time Time object.
   * @returns Returns the difference time.
   */
  @Class.Private()
  private getElapsedTime(time: Date): string {
    const difference = new Date().getTime() - time.getTime();
    if (difference < 1000) {
      return `${this.getFilledValue(difference, 5, ' ')}ms`;
    } else if (difference < 60000) {
      return `${this.getFilledValue((difference / 1000).toFixed(2), 5, ' ')}s `;
    } else if (difference < 3600000) {
      return `${this.getFilledValue((difference / 60000).toFixed(2), 5, ' ')}m `;
    } else {
      return `${this.getFilledValue((difference / 3600000).toFixed(2), 5, ' ')}h `;
    }
  }

  /**
   * Gets the request resume for the specified request information.
   * @param request Request information.
   * @returns Returns the request resume.
   */
  @Class.Private()
  private getRequestResume(request: Aliases.Request): string {
    const entry = <Entry>this.entryMap.get(request.input);
    const status = `${entry.status.process ? 'P' : ''}${entry.status.error ? 'E' : ''}${entry.status.send ? 'S' : ''}`;
    const elapsed = this.getElapsedTime(entry.time);
    const port = this.getFilledValue(request.input.connection.port, 5, ' ');
    const address = request.input.connection.address;
    return `${status} ${elapsed} ${port} ${address}\t${request.output.status} ${request.input.method} ${request.path}`;
  }

  /**
   * Receive handler.
   * @param request Request information.
   */
  @Class.Public()
  public onReceive(request: Aliases.Request): void {
    this.entryMap.set(request.input, {
      time: new Date(),
      status: {
        process: false,
        error: false,
        send: false
      }
    });
  }

  /**
   * Process handler.
   * @param request Request information.
   */
  @Class.Public()
  public onProcess(request: Aliases.Request): void {
    (<Entry>this.entryMap.get(request.input)).status.process = true;
  }

  /**
   * Send handler.
   * @param request Request information.
   */
  @Class.Public()
  public onSend(request: Aliases.Request): void {
    (<Entry>this.entryMap.get(request.input)).status.send = true;
    console.log(`${this.getCurrentTime()} ${this.getRequestResume(request)}`);
  }

  /**
   * Error handler.
   * @param request Request information.
   */
  @Class.Public()
  public onError(request: Aliases.Request): void {
    (<Entry>this.entryMap.get(request.input)).status.error = true;
    console.log(`${this.getCurrentTime()} ${this.getRequestResume(request)} "${(<Error>request.error).message}"`);
  }

  /**
   * Start handler.
   */
  @Class.Public()
  public onStart(): void {
    console.log(`${this.getCurrentTime()} L`);
  }

  /**
   * Stop handler.
   */
  @Class.Public()
  public onStop(): void {
    console.log(`${this.getCurrentTime()} C`);
  }
}
