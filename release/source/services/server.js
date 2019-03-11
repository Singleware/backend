"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Http = require("http");
const Url = require("url");
const Class = require("@singleware/class");
const Observable = require("@singleware/observable");
const Request = require("./request");
const helper_1 = require("./helper");
/**
 * Back-end HTTP service class.
 */
let Server = class Server extends Class.Null {
    /**
     * Default constructor.
     * @param settings Application settings.
     */
    constructor(settings) {
        super();
        /**
         * Receive subject instance.
         */
        this.receiveSubject = new Observable.Subject();
        /**
         * Send subject instance.
         */
        this.sendSubject = new Observable.Subject();
        /**
         * Error subject instance.
         */
        this.errorSubject = new Observable.Subject();
        this.settings = settings;
        this.server = Http.createServer(this.requestHandler.bind(this));
    }
    /**
     * Gets an error request based on the specified request information.
     * @param request Request information.
     * @returns Returns the new error request.
     */
    getErrorRequest(request) {
        if (!request.error) {
            return request;
        }
        const input = request.input;
        return helper_1.Helper.getRequest(input.address, input.port, input.method, `#${request.path}`, input.search, input.headers, {
            exception: this.settings.debug ? request.error.stack : request.error.message
        });
    }
    /**
     * Response send handler.
     * @param request Request information.
     */
    sendHandler(request) {
        this.sendSubject.notifyAll(request);
    }
    /**
     * Request error handler.
     * @param request Request information.
     * @param error Error information.
     */
    errorHandler(request, response, error) {
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
    receiveHandler(request, data) {
        request.input.data += data;
    }
    /**
     * Response event handler.
     * @param request Request information.
     * @param response Response manager.
     */
    async responseHandler(request, response) {
        await this.receiveSubject.notifyAll(request);
        if (request.error) {
            this.responseHandler(this.getErrorRequest(request), response);
        }
        else {
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
    requestHandler(incoming, response) {
        const url = Url.parse(incoming.url || '/');
        const address = helper_1.Helper.getRemoteAddress(incoming) || '0.0.0.0';
        const port = incoming.connection.remotePort || incoming.socket.remotePort || 0;
        const method = (incoming.method || 'GET').toUpperCase();
        const path = url.pathname || '/';
        const search = Request.Helper.getURLSearch(url.search || '');
        const request = helper_1.Helper.getRequest(address, port, method, path, search, incoming.headers, {});
        incoming.on('data', this.receiveHandler.bind(this, request));
        incoming.on('error', this.errorHandler.bind(this, request, response));
        incoming.on('end', this.responseHandler.bind(this, request, response));
    }
    /**
     * Receive request event.
     */
    get onReceive() {
        return this.receiveSubject;
    }
    /**
     * Send response event.
     */
    get onSend() {
        return this.sendSubject;
    }
    /**
     * Error response event.
     */
    get onError() {
        return this.errorSubject;
    }
    /**
     * Starts the service listening.
     */
    start() {
        this.server.listen(this.settings.port, this.settings.host, this.settings.limit);
    }
    /**
     * Stops the service listening.
     */
    stop() {
        this.server.close();
    }
};
__decorate([
    Class.Private()
], Server.prototype, "server", void 0);
__decorate([
    Class.Private()
], Server.prototype, "settings", void 0);
__decorate([
    Class.Private()
], Server.prototype, "receiveSubject", void 0);
__decorate([
    Class.Private()
], Server.prototype, "sendSubject", void 0);
__decorate([
    Class.Private()
], Server.prototype, "errorSubject", void 0);
__decorate([
    Class.Private()
], Server.prototype, "getErrorRequest", null);
__decorate([
    Class.Private()
], Server.prototype, "sendHandler", null);
__decorate([
    Class.Private()
], Server.prototype, "errorHandler", null);
__decorate([
    Class.Private()
], Server.prototype, "receiveHandler", null);
__decorate([
    Class.Private()
], Server.prototype, "responseHandler", null);
__decorate([
    Class.Private()
], Server.prototype, "requestHandler", null);
__decorate([
    Class.Public()
], Server.prototype, "onReceive", null);
__decorate([
    Class.Public()
], Server.prototype, "onSend", null);
__decorate([
    Class.Public()
], Server.prototype, "onError", null);
__decorate([
    Class.Public()
], Server.prototype, "start", null);
__decorate([
    Class.Public()
], Server.prototype, "stop", null);
Server = __decorate([
    Class.Describe()
], Server);
exports.Server = Server;
