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
const Url = require("url");
const Class = require("@singleware/class");
/**
 * Request helper class.
 */
let Helper = class Helper extends Class.Null {
    /**
     * Gets one map containing all search parameters from the specified search string.
     * @param search Search string.
     * @returns Returns the map containing all parameters acquired from the given search string.
     */
    static parseURLSearch(search) {
        const params = new Url.URLSearchParams(search);
        const map = {};
        for (const [key, value] of params) {
            const current = map[key];
            if (current) {
                if (typeof current === 'string') {
                    map[key] = [current];
                }
                map[key].push(value);
            }
            else {
                map[key] = value;
            }
        }
        return map;
    }
};
__decorate([
    Class.Public()
], Helper, "parseURLSearch", null);
Helper = __decorate([
    Class.Describe()
], Helper);
exports.Helper = Helper;