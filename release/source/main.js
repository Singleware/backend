"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1;
"use strict";
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const Application = require("@singleware/application");
const response_1 = require("./response");
/**
 * Back-end application class.
 */
let Main = Main_1 = class Main extends Application.Main {
    /**
     * Default constructor.
     * @param settings Application settings.
     */
    constructor(settings) {
        super({
            separator: '/',
            variable: /^\{([a-z_0-9]+)\}$/
        });
        this.settings = settings;
    }
    /**
     * Set all security headers into the output.
     * @param output Output information.
     * @param input Input information.
     * @param variables Route variables.
     */
    setSecurityHeaders(output, input, variables) {
        if (this.settings.CrossOriginRequestSharing || variables.CORS) {
            Main_1.setCORS(output, input, { ...this.settings.CrossOriginRequestSharing, ...variables.CORS });
        }
        if (this.settings.StrictTransportSecurity || variables.HSTS) {
            Main_1.setHSTS(output, { ...this.settings.StrictTransportSecurity, ...variables.HSTS });
        }
    }
    /**
     * Process event handler.
     * @param match Matched routes.
     * @param callback Handler callback.
     */
    async processHandler(match, callback) {
        const methods = match.variables.methods;
        const output = match.detail.output;
        const input = match.detail.input;
        this.setSecurityHeaders(output, input, match.variables);
        if ((methods instanceof Array && methods.indexOf(input.method) !== -1) || methods === input.method || methods === '*') {
            await super.processHandler(match, callback);
        }
        else if (input.method === 'OPTIONS') {
            response_1.Response.setStatus(output, 204);
        }
        else {
            await match.next();
        }
    }
    /**
     * Set the CORS headers.
     * @param output Output information.
     * @param cors CORS information.
     */
    static setCORS(output, input, cors) {
        response_1.Response.setMultiHeaders(output, {
            'Access-Control-Allow-Origin': cors.allowOrigin || input.headers['origin'],
            'Access-Control-Allow-Methods': cors.allowMethods || ['HEAD', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            'Access-Control-Allow-Credentials': cors.allowCredentials ? 'true' : 'false',
            'Access-Control-Allow-Headers': cors.allowHeaders,
            'Access-Control-Expose-Headers': cors.exposeHeaders,
            'Access-Control-Max-Age': cors.maxAge !== void 0 ? `${cors.maxAge}` : void 0
        });
    }
    /**
     * Set the HSTS headers.
     * @param output Output information.
     * @param hsts HSTS information.
     */
    static setHSTS(output, hsts) {
        let value = `max-age=${hsts.maxAge}`;
        if (hsts.option) {
            value += `; ${hsts.option}`;
        }
        response_1.Response.setHeader(output, 'Strict-Transport-Security', value);
    }
};
__decorate([
    Class.Protected()
], Main.prototype, "settings", void 0);
__decorate([
    Class.Protected()
], Main.prototype, "setSecurityHeaders", null);
__decorate([
    Class.Protected()
], Main.prototype, "processHandler", null);
__decorate([
    Class.Protected()
], Main, "setCORS", null);
__decorate([
    Class.Protected()
], Main, "setHSTS", null);
Main = Main_1 = __decorate([
    Class.Describe()
], Main);
exports.Main = Main;
