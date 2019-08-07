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
const Application = require("@singleware/application");
const Responses = require("../../responses");
/**
 * Default JSON handler class.
 */
let Default = class Default extends Class.Null {
    /**
     * Default constructor.
     * @param settings Handler settings.
     */
    constructor(settings) {
        super();
        this.settings = settings;
    }
    /**
     * Sets the specified output with the given response status, code and text.
     * @param output Output entity.
     * @param status Output status.
     * @param code Optional output code.
     * @param text Optional output text.
     */
    setResponseStatus(output, status, code, text) {
        Responses.Helper.setStatusJson(output, status, code, text);
    }
    /**
     * Sets the specified output with the given response status and content.
     * @param output Output entity.
     * @param status Output status.
     * @param content Output content.
     */
    setResponseContent(output, status, content) {
        Responses.Helper.setContentJson(output, content);
        Responses.Helper.setStatus(output, status);
    }
    /**
     * Sets the specified output with the given response status and headers.
     * @param output Output entity.
     * @param status Output status.
     * @param headers Output headers.
     */
    setResponseHeaders(output, status, headers) {
        Responses.Helper.setMultipleHeaders(output, headers);
        Responses.Helper.setStatus(output, status);
    }
    /**
     * Exception response processor.
     * @param match Matched route.
     */
    async exceptionResponse(match) {
        this.setResponseStatus(match.detail.output, 500, 500, match.detail.environment.local.exception);
    }
    /**
     * Default response processor.
     * @param match Matched route.
     */
    async defaultResponse(match) {
        this.setResponseStatus(match.detail.output, 501);
    }
};
__decorate([
    Class.Private()
], Default.prototype, "settings", void 0);
__decorate([
    Class.Protected()
], Default.prototype, "setResponseStatus", null);
__decorate([
    Class.Protected()
], Default.prototype, "setResponseContent", null);
__decorate([
    Class.Protected()
], Default.prototype, "setResponseHeaders", null);
__decorate([
    Class.Public(),
    Application.Processor({ path: '#', exact: false, environment: { methods: '*' } })
], Default.prototype, "exceptionResponse", null);
__decorate([
    Class.Public(),
    Application.Processor({ path: '/', exact: false, environment: { methods: '*' } })
], Default.prototype, "defaultResponse", null);
Default = __decorate([
    Class.Describe()
], Default);
exports.Default = Default;
//# sourceMappingURL=default.js.map