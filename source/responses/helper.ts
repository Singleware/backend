/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Headers } from '../headers';

import { Status } from './status';
import { Output } from './output';

/**
 * Response helper class.
 */
@Class.Describe()
export class Helper extends Class.Null {
  /**
   * Messages by status.
   */
  @Class.Private()
  private static messages = <Status>{
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    103: 'Early Hints',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    207: 'Multi-Status',
    208: 'Already Reported',
    226: 'IM Used',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    421: 'Misdirected Request',
    422: 'Unprocessable Entity',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Too Early',
    426: 'Upgrade Required',
    427: 'Unassigned',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    430: 'Unassigned',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    510: 'Not Extended',
    511: 'Network Authentication Required'
  };

  /**
   * Set one response header.
   * @param output Output entity.
   * @param name Header name.
   * @param value Header value.
   */
  @Class.Public()
  public static setHeader(output: Output, name: string, value: number | string | string[]): void {
    output.headers[name] = value;
  }

  /**
   * Set multiple response headers.
   * @param output Output entity.
   * @param headers Headers to be set.
   */
  @Class.Public()
  public static setMultipleHeaders(output: Output, headers: Headers): void {
    for (const name in headers) {
      const header = headers[name];
      if (header !== void 0) {
        this.setHeader(output, name, header);
      }
    }
  }

  /**
   * Set the response status.
   * @param output Output entity.
   * @param status Status code.
   * @throws Throws a type error when the status does not exists and an error when the status 204 is set up with content data.
   */
  @Class.Public()
  public static setStatus(output: Output, status: number): void {
    if (!this.messages[status]) {
      throw new TypeError(`A nonexistent status '${status}' can't be set.`);
    }
    if (status === 204 && output.data && output.data.byteLength > 0) {
      throw new Error(`Status code 204 can't be set with content data.`);
    }
    output.status = status;
    output.message = this.messages[status];
  }

  /**
   * Set the response content.
   * @param output Output entity.
   * @param data Output data.
   * @param type Output MIME type.
   * @throws Throws an error when the content is set with status 204.
   */
  @Class.Public()
  public static setContent(output: Output, data: string | Buffer, type?: string): void {
    if (output.status === 204) {
      throw new Error(`Content can't be set up with status code 204.`);
    }
    output.data = data instanceof Buffer ? data : Buffer.from(data, 'utf-8');
    this.setMultipleHeaders(output, {
      'Content-Length': output.data.byteLength,
      'Content-Type': type || 'application/octet-stream'
    });
  }

  /**
   * Set the response content attachment.
   * @param output Output entity.
   * @param name Downloaded file name.
   * @param data Output data to download.
   * @param type Output MIME type.
   */
  @Class.Public()
  public static setContentAttachment(output: Output, name: string, data: string | Buffer, type?: string): void {
    this.setHeader(output, 'Content-Disposition', `attachment filename='${name}'`);
    this.setContent(output, data, type);
  }

  /**
   * Set the response content JSON.
   * @param output Output entity.
   * @param content Output content.
   */
  @Class.Public()
  public static setContentJson<T extends Object>(output: Output, content: T): void {
    this.setContent(output, JSON.stringify(content), 'application/json');
  }

  /**
   * Set the response status and the response content JSON.
   * @param output Output entity.
   * @param status Output status.
   * @param code Optional output code.
   * @param text Optional output text.
   */
  @Class.Public()
  public static setStatusJson(output: Output, status: number, code?: number, text?: string): void {
    this.setStatus(output, status);
    if (status !== 204) {
      this.setContentJson(output, { code: code || status, text: text || this.messages[status] || '' });
    }
  }
}
