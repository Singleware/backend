/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import { Status } from './status';
import { Headers } from './headers';
import { Output } from './output';

/**
 * Application response helper class.
 */
@Class.Describe()
export class Response {
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
   * Set a response header.
   * @param output Output information.
   * @param name Header name.
   * @param value Header value.
   */
  @Class.Public()
  public static setHeader(output: Output, name: string, value: string | string[]): void {
    output.headers[name] = value;
  }

  /**
   * Set multi response headers.
   * @param output Output information.
   * @param headers Headers to be set.
   */
  @Class.Public()
  public static setMultiHeaders(output: Output, headers: Headers): void {
    for (const name in headers) {
      const header = headers[name];
      if (header !== void 0 && header.length > 0) {
        Response.setHeader(output, name, header);
      }
    }
  }

  /**
   * Set the response status.
   * @param output Output information.
   * @param status Status code.
   */
  @Class.Public()
  public static setStatus(output: Output, status: number): void {
    if (!Response.messages[status]) {
      throw new TypeError(`Nonexistent status '${status}' can't be set.`);
    }
    output.message = Response.messages[status];
    output.status = status;
  }

  /**
   * Set the response content.
   * @param output Output information.
   * @param data Output data.
   * @param mime Output MIME type.
   */
  @Class.Public()
  public static setContent(output: Output, data: string | Buffer, mime?: string): void {
    Response.setHeader(output, 'Content-Type', mime || 'application/octet-stream');
    output.data = data;
  }

  /**
   * Set the response content attachment.
   * @param output Output information.
   * @param name Downloaded file name.
   * @param data Output data to download.
   * @param mime Output MIME type.
   */
  @Class.Public()
  public static setContentAttachment(output: Output, name: string, data: string | Buffer, mime?: string): void {
    Response.setHeader(output, 'Content-Disposition', `attachment filename='${name}'`);
    Response.setContent(output, data, mime);
  }

  /**
   * Set the response content JSON.
   * @param output Output information.
   * @param content Output content.
   */
  @Class.Public()
  public static setContentJson<T extends Object>(output: Output, content: T): void {
    Response.setContent(output, JSON.stringify(content), 'application/json');
  }

  /**
   * Set the response status and the response content JSON.
   * @param output Output information.
   * @param status Output status.
   * @param message Output message.
   */
  @Class.Public()
  public static setStatusJson(output: Output, status: number, message?: string): void {
    Response.setStatus(output, status);
    Response.setContentJson(output, { status: status, message: message || Response.messages[status] || '' });
  }
}
