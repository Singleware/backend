"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
/**
 * Back-end HTTP logger class.
 */
let Console = class Console {
    /**
     * Gets the request header from the specified request information.
     * @param type Header type.
     * @param request Request information.
     * @returns Returns the request header.
     */
    getHeader(type, request) {
        return `${new Date().toLocaleString()} [${type}] ${request.input.address}\t${request.input.method}\t${request.path}`;
    }
    /**
     * Receive handler.
     * @param request Request information.
     */
    onReceive(request) {
        console.log(`${this.getHeader('R', request)}`);
    }
    /**
     * Process handler.
     * @param request Request information.
     */
    onProcess(request) {
        console.log(`${this.getHeader('P', request)}`);
    }
    /**
     * Send handler.
     * @param request Request information.
     */
    onSend(request) {
        console.log(`${this.getHeader('S', request)}`);
    }
    /**
     * Error handler.
     * @param request Request information.
     */
    onError(request) {
        console.log(`${this.getHeader('E', request)}`);
        console.log(request.environment.exception);
    }
};
__decorate([
    Class.Private()
], Console.prototype, "getHeader", null);
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
Console = __decorate([
    Class.Describe()
], Console);
exports.Console = Console;
