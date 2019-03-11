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
const Class = require("@singleware/class");
/**
 * Back-end HTTP logger class.
 */
let Console = class Console extends Class.Null {
    /**
     * Gets the a new header for the specified type.
     * @param type Header type.
     * @returns Returns the new header.
     */
    getHeader(type) {
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
    getRequest(request) {
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
    onReceive(request) {
        console.log(`${this.getHeader('Receive')} ${this.getRequest(request)}`);
    }
    /**
     * Process handler.
     * @param request Request information.
     */
    onProcess(request) {
        console.log(`${this.getHeader('Process')} ${this.getRequest(request)}`);
    }
    /**
     * Send handler.
     * @param request Request information.
     */
    onSend(request) {
        console.log(`${this.getHeader('Send')} ${this.getRequest(request)}`);
    }
    /**
     * Error handler.
     * @param request Request information.
     */
    onError(request) {
        console.log(`${this.getHeader('Error')} ${this.getRequest(request)} "${request.error.message}"`);
    }
    /**
     * Start handler.
     */
    onStart() {
        console.log(`${this.getHeader('Start')}`);
    }
    /**
     * Stop handler.
     */
    onStop() {
        console.log(`${this.getHeader('Stop')}`);
    }
};
__decorate([
    Class.Private()
], Console.prototype, "getHeader", null);
__decorate([
    Class.Private()
], Console.prototype, "getRequest", null);
__decorate([
    Class.Public()
], Console.prototype, "onReceive", null);
__decorate([
    Class.Public()
], Console.prototype, "onProcess", null);
__decorate([
    Class.Public()
], Console.prototype, "onSend", null);
__decorate([
    Class.Public()
], Console.prototype, "onError", null);
__decorate([
    Class.Public()
], Console.prototype, "onStart", null);
__decorate([
    Class.Public()
], Console.prototype, "onStop", null);
Console = __decorate([
    Class.Describe()
], Console);
exports.Console = Console;
