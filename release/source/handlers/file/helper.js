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
const Fs = require("fs");
const Util = require("util");
const Class = require("@singleware/class");
/**
 * File helper class.
 */
let Helper = class Helper extends Class.Null {
    /**
     * Read all contents of the specified file.
     * @param path File path.
     * @returns Returns the file content.
     */
    static async readFile(path) {
        return await Util.promisify(Fs.readFile)(path);
    }
    /**
     * Test whether the specified file exists or not.
     * @param path File path.
     * @returns Returns the promise to get true when the file exists or false otherwise.
     */
    static async fileExists(path) {
        return (await Util.promisify(Fs.exists)(path)) && (await Util.promisify(Fs.lstat)(path)).isFile();
    }
};
__decorate([
    Class.Public()
], Helper, "readFile", null);
__decorate([
    Class.Public()
], Helper, "fileExists", null);
Helper = __decorate([
    Class.Describe()
], Helper);
exports.Helper = Helper;
