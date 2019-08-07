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
const Security = require("./security");
const Responses = require("./responses");
/**
 * Back-end application class.
 */
let Main = class Main extends Application.Main {
    /**
     * Default constructor.
     * @param settings Application settings.
     */
    constructor(settings) {
        super({ separator: '/', variable: /^\{([a-zA-Z_0-9]+)\}$/ });
        this.settings = settings;
    }
    /**
     * Determines whether the specified method is allowed or not.
     * @param request Method name.
     * @param methods Allowed method list.
     * @returns Returns true when the request method is allowed, false otherwise.
     */
    isAllowedMethod(method, methods) {
        return (methods instanceof Array && methods.includes(method)) || methods === method || methods === '*';
    }
    /**
     * Set all response headers into the specified request.
     * @param request Request information.
     * @param variables Route variables.
     */
    setResponseHeaders(request, variables) {
        if (this.settings.contentSecurityPolicy || variables.contentSecurityPolicy) {
            Security.CSP.Helper.setHeaders(request, {
                ...this.settings.contentSecurityPolicy,
                ...variables.contentSecurityPolicy
            });
        }
        if (this.settings.crossOriginRequestSharing || variables.crossOriginRequestSharing) {
            Security.CORS.Helper.setHeaders(request, {
                ...this.settings.crossOriginRequestSharing,
                ...variables.crossOriginRequestSharing
            });
        }
        if (this.settings.httpStrictTransportSecurity || variables.httpStrictTransportSecurity) {
            Security.HSTS.Helper.setHeaders(request, {
                ...this.settings.httpStrictTransportSecurity,
                ...variables.httpStrictTransportSecurity
            });
        }
    }
    /**
     * Filter handler to be inherited and extended.
     * @param match Match information.
     * @param allowed Determine whether the filter is allowing the request matching or not.
     * @returns Returns true when the filter handler still allows the request matching or false otherwise.
     */
    async filterHandler(match, allowed) {
        if (!allowed) {
            this.setResponseHeaders(match.detail, match.variables);
        }
        return allowed;
    }
    /**
     * Process event handler.
     * @param match Matched routes.
     * @param callback Handler callback.
     */
    async processHandler(match, callback) {
        if (this.isAllowedMethod(match.detail.input.method, match.variables.methods)) {
            this.setResponseHeaders(match.detail, match.variables);
            await super.processHandler(match, callback);
        }
        else if (match.detail.input.method === 'OPTIONS' && match.detail.output.status !== 204) {
            this.setResponseHeaders(match.detail, {});
            Responses.Helper.setStatus(match.detail.output, 204);
        }
    }
};
__decorate([
    Class.Protected()
], Main.prototype, "settings", void 0);
__decorate([
    Class.Private()
], Main.prototype, "isAllowedMethod", null);
__decorate([
    Class.Private()
], Main.prototype, "setResponseHeaders", null);
__decorate([
    Class.Protected()
], Main.prototype, "filterHandler", null);
__decorate([
    Class.Protected()
], Main.prototype, "processHandler", null);
Main = __decorate([
    Class.Describe()
], Main);
exports.Main = Main;
//# sourceMappingURL=main.js.map