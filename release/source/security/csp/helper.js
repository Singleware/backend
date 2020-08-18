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
 * CSP helper class.
 */
let Helper = class Helper extends Class.Null {
    /**
     * Build and get the concatenated policy values from the specified list of polices.
     * @param list List of polices.
     * @returns Returns the policy values or undefined when the policy list is empty.
     */
    static buildConcatenatedPolices(list) {
        const polices = [];
        for (const policy of list) {
            const value = policy.value instanceof Array ? policy.value.join(' ') : policy.value;
            polices.push(`${policy.name} ${value}`);
        }
        return polices.length > 0 ? polices.join('; ') : void 0;
    }
    /**
     * Set all the CSP headers in the specified request.
     * @param request Request information.
     * @param settings CSP settings.
     */
    static setHeaders(request, settings) {
        Responses.Helper.setMultipleHeaders(request.output, {
            'Content-Security-Policy': this.buildConcatenatedPolices(settings.polices),
            'Content-Security-Policy-Report-Only': settings.reportPolices ? this.buildConcatenatedPolices(settings.reportPolices) : void 0
        });
    }
};
__decorate([
    Class.Private()
], Helper, "buildConcatenatedPolices", null);
__decorate([
    Class.Public()
], Helper, "setHeaders", null);
Helper = __decorate([
    Class.Describe()
], Helper);
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map