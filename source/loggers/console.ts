/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Types from '../types';
import * as Request from '../services/request';

import { Entry } from './entry';

/**
 * Back-end HTTP logger class.
 */
@Class.Describe()
export class Console extends Class.Null implements Types.Logger {
  /**
   * Map of request entries.
   */
  @Class.Private()
  private entryMap = new WeakMap<Request.Input, Entry>();

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
    const month = this.getFilledValue(time.getUTCMonth() + 1, 2, '0');
    const date = this.getFilledValue(time.getUTCDate(), 2, '0');
    const year = time.getUTCFullYear();
    const hour = this.getFilledValue(time.getUTCHours(), 2, '0');
    const minute = this.getFilledValue(time.getUTCMinutes(), 2, '0');
    const second = this.getFilledValue(time.getUTCSeconds(), 2, '0');
    return `${month}-${date}-${year} ${hour}:${minute}:${second}`;
  }

  /**
   * Gets the difference between the specified time and the current time.
   * @param time Time object.
   * @returns Returns the difference time.
   */
  @Class.Private()
  private getDifferenceTime(time: Date): string {
    const difference = new Date().getUTCMilliseconds() - time.getUTCMilliseconds();
    if (difference < 1000) {
      return `${this.getFilledValue(difference, 3, '0')}ms`;
    } else if (difference < 60000) {
      return `${this.getFilledValue(Math.abs(difference / 1000), 3, '0')}s `;
    } else {
      return `${this.getFilledValue(Math.abs(difference / 60000), 3, '0')}m `;
    }
  }

  /**
   * Gets the request resume for the specified request information.
   * @param request Request information.
   * @returns Returns the request resume.
   */
  @Class.Private()
  private getRequestResume(request: Types.Request): string {
    const entry = <Entry>this.entryMap.get(request.input);
    const status = entry.status.join('');
    const difference = this.getDifferenceTime(entry.time);
    const port = this.getFilledValue(request.input.port, 5, ' ');
    const address = request.input.address;
    return `${status} ${difference} ${port} ${address}\t${request.output.status} ${request.input.method}\t${request.path}`;
  }

  /**
   * Receive handler.
   * @param request Request information.
   */
  @Class.Public()
  public onReceive(request: Types.Request): void {
    this.entryMap.set(request.input, { time: new Date(), status: ['R', '-', '-'] });
  }

  /**
   * Process handler.
   * @param request Request information.
   */
  @Class.Public()
  public onProcess(request: Types.Request): void {
    (<Entry>this.entryMap.get(request.input)).status[1] = 'P';
  }

  /**
   * Send handler.
   * @param request Request information.
   */
  @Class.Public()
  public onSend(request: Types.Request): void {
    (<Entry>this.entryMap.get(request.input)).status[2] = 'S';
    console.log(`${this.getCurrentTime()} ${this.getRequestResume(request)}`);
  }

  /**
   * Error handler.
   * @param request Request information.
   */
  @Class.Public()
  public onError(request: Types.Request): void {
    (<Entry>this.entryMap.get(request.input)).status[2] = 'E';
    console.log(`${this.getCurrentTime()} ${this.getRequestResume(request)} "${(<Error>request.error).message}"`);
  }

  /**
   * Start handler.
   */
  @Class.Public()
  public onStart(): void {
    console.log(`${this.getCurrentTime()} B`);
  }

  /**
   * Stop handler.
   */
  @Class.Public()
  public onStop(): void {
    console.log(`${this.getCurrentTime()} T`);
  }
}
