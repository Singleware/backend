"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
/**
 * Response helper class.
 */
let Helper = class Helper extends Class.Null {
    /**
     * Set one response header.
     * @param output Output entity.
     * @param name Header name.
     * @param value Header value.
     */
    static setHeader(output, name, value) {
        output.headers[name] = value;
    }
    /**
     * Set multiple response headers.
     * @param output Output entity.
     * @param headers Headers to be set.
     */
    static setMultipleHeaders(output, headers) {
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
    static setStatus(output, status) {
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
    static setContent(output, data, type) {
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
    static setContentAttachment(output, name, data, type) {
        this.setHeader(output, 'Content-Disposition', `inline; filename="${name}"`);
        this.setContent(output, data, type);
    }
    /**
     * Set the response content JSON.
     * @param output Output entity.
     * @param content Output content.
     */
    static setContentJson(output, content) {
        this.setContent(output, JSON.stringify(content), 'application/json');
    }
    /**
     * Set the response status and the response content JSON.
     * @param output Output entity.
     * @param status Output status.
     * @param code Optional output code.
     * @param text Optional output text.
     */
    static setStatusJson(output, status, code, text) {
        this.setStatus(output, status);
        if (status !== 204) {
            this.setContentJson(output, { code: code || status, text: text || this.messages[status] || '' });
        }
    }
};
/**
 * Messages by status.
 */
Helper.messages = {
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
__decorate([
    Class.Private()
], Helper, "messages", void 0);
__decorate([
    Class.Public()
], Helper, "setHeader", null);
__decorate([
    Class.Public()
], Helper, "setMultipleHeaders", null);
__decorate([
    Class.Public()
], Helper, "setStatus", null);
__decorate([
    Class.Public()
], Helper, "setContent", null);
__decorate([
    Class.Public()
], Helper, "setContentAttachment", null);
__decorate([
    Class.Public()
], Helper, "setContentJson", null);
__decorate([
    Class.Public()
], Helper, "setStatusJson", null);
Helper = __decorate([
    Class.Describe()
], Helper);
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map