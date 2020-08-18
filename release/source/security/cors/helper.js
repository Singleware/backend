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
const Responses = require("../../responses");
/**
 * CORS helper class.
 */
let Helper = class Helper extends Class.Null {
    /**
     * Set all the CORS headers in the specified request.
     * @param request Request information.
     * @param settings CORS settings.
     */
    static setHeaders(request, settings) {
        Responses.Helper.setMultipleHeaders(request.output, {
            'Access-Control-Allow-Origin': settings.allowOrigin || request.input.headers['origin'],
            'Access-Control-Allow-Methods': (settings.allowMethods || ['HEAD', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']).join(', '),
            'Access-Control-Allow-Credentials': settings.allowCredentials ? 'true' : 'false',
            'Access-Control-Allow-Headers': settings.allowHeaders ? settings.allowHeaders.join(', ') : void 0,
            'Access-Control-Expose-Headers': settings.exposeHeaders ? settings.exposeHeaders.join(', ') : void 0,
            'Access-Control-Max-Age': settings.maxAge
        });
    }
};
__decorate([
    Class.Public()
], Helper, "setHeaders", null);
Helper = __decorate([
    Class.Describe()
], Helper);
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map