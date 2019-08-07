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
const Pipeline = require("@singleware/pipeline");
const Aliases = require("../aliases");
const Services = require("../services");
/**
 * Tests helper class.
 */
let Helper = class Helper extends Class.Null {
    /**
     * Creates a new fake application request based on the specified options.
     * @param options Request options.
     * @returns Returns the generated application request.
     */
    static getRequest(options) {
        const request = Services.Helper.getRequest(options.connection, options.method, options.path, options.search, options.headers, options.environment.local);
        request.input.data = options.data;
        request.environment.shared = options.environment.shared;
        return request;
    }
    /**
     * Creates a new fake request matching for test purposes.
     * @param options Request options.
     * @returns Returns the generated request matching.
     */
    static createMatch(options) {
        const current = { ...this.defaultOptions, ...options };
        const request = this.getRequest(current);
        return new Aliases.Match(request.path, current.remaining, [request.environment.local], request, new Pipeline.Subject());
    }
};
/**
 * Default request options.
 */
Helper.defaultOptions = {
    connection: {
        active: false,
        address: '0.0.0.0',
        port: 0
    },
    environment: {
        local: {},
        shared: {}
    },
    path: '',
    remaining: '',
    search: {},
    method: 'GET',
    headers: {},
    data: ''
};
__decorate([
    Class.Private()
], Helper, "defaultOptions", void 0);
__decorate([
    Class.Private()
], Helper, "getRequest", null);
__decorate([
    Class.Public()
], Helper, "createMatch", null);
Helper = __decorate([
    Class.Describe()
], Helper);
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map