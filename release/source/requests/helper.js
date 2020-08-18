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
const Url = require("url");
const Class = require("@singleware/class");
/**
 * Request helper class.
 */
let Helper = class Helper extends Class.Null {
    /**
     * Generate a new map containing all search parameters from the specified search string.
     * @param search Search string.
     * @returns Returns the map containing all parameters parsed from the given search string.
     */
    static parseURLSearch(search) {
        const params = new Url.URLSearchParams(search);
        const map = {};
        for (const [key, value] of params) {
            const current = map[key];
            if (current !== void 0) {
                if (current instanceof Array) {
                    current.push(value);
                }
                else {
                    map[key] = [current, value];
                }
            }
            else {
                map[key] = value;
            }
        }
        return map;
    }
    /**
     * Generate a new string containing all search parameters from the specified search map.
     * @param search Search map.
     * @returns Returns the string corresponding to the given search map.
     */
    static stringfyURLSearch(search) {
        const params = [];
        for (const [key, value] of Object.entries(search)) {
            if (value instanceof Array) {
                for (const current of value) {
                    if (current.length > 0) {
                        params.push(`${key}=${encodeURI(current)}`);
                    }
                    else {
                        params.push(`${key}`);
                    }
                }
            }
            else if (value.length > 0) {
                params.push(`${key}=${encodeURI(value)}`);
            }
            else {
                params.push(`${key}`);
            }
        }
        return params.join('&');
    }
};
__decorate([
    Class.Public()
], Helper, "parseURLSearch", null);
__decorate([
    Class.Public()
], Helper, "stringfyURLSearch", null);
Helper = __decorate([
    Class.Describe()
], Helper);
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map