"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
/**
 * Back-end HTTP logger class.
 */
let Console = class Console extends Class.Null {
    constructor() {
        super(...arguments);
        /**
         * Map of request entries.
         */
        this.entryMap = new WeakMap();
    }
    /**
     * Gets the specified value filled by the given digit character and the minimum length.
     * @param value Input value.
     * @param length Minimum length
     * @param digit Digit character.
     * @returns Returns the filled string.
     */
    getFilledValue(value, length, digit) {
        return value.toString().padStart(length, digit[0]);
    }
    /**
     * Gets the current time string.
     * @returns Returns the current time string.
     */
    getCurrentTime() {
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
    getElapsedTime(time) {
        const difference = new Date().getTime() - time.getTime();
        if (difference < 1000) {
            return `${this.getFilledValue(difference, 5, ' ')}ms`;
        }
        else if (difference < 60000) {
            return `${this.getFilledValue((difference / 1000).toFixed(2), 5, ' ')}s `;
        }
        else if (difference < 3600000) {
            return `${this.getFilledValue((difference / 60000).toFixed(2), 5, ' ')}m `;
        }
        else {
            return `${this.getFilledValue((difference / 3600000).toFixed(2), 5, ' ')}h `;
        }
    }
    /**
     * Gets the request resume for the specified request information.
     * @param request Request information.
     * @returns Returns the request resume.
     */
    getRequestResume(request) {
        const entry = this.entryMap.get(request.input);
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
    onReceive(request) {
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
    onProcess(request) {
        this.entryMap.get(request.input).status.process = true;
    }
    /**
     * Send handler.
     * @param request Request information.
     */
    onSend(request) {
        this.entryMap.get(request.input).status.send = true;
        console.log(`${this.getCurrentTime()} ${this.getRequestResume(request)}`);
    }
    /**
     * Error handler.
     * @param request Request information.
     */
    onError(request) {
        this.entryMap.get(request.input).status.error = true;
        console.log(`${this.getCurrentTime()} ${this.getRequestResume(request)} "${request.error.message}"`);
    }
    /**
     * Start handler.
     */
    onStart() {
        console.log(`${this.getCurrentTime()} L`);
    }
    /**
     * Stop handler.
     */
    onStop() {
        console.log(`${this.getCurrentTime()} C`);
    }
};
__decorate([
    Class.Private()
], Console.prototype, "entryMap", void 0);
__decorate([
    Class.Private()
], Console.prototype, "getFilledValue", null);
__decorate([
    Class.Private()
], Console.prototype, "getCurrentTime", null);
__decorate([
    Class.Private()
], Console.prototype, "getElapsedTime", null);
__decorate([
    Class.Private()
], Console.prototype, "getRequestResume", null);
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
//# sourceMappingURL=console.js.map