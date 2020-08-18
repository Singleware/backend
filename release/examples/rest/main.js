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
const Backend = require("../../source");
const handler_1 = require("./handler");
/**
 * JSON server, example class.
 */
let Example = class Example extends Backend.Main {
    constructor() {
        super({
            crossOriginRequestSharing: {
                allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
                maxAge: 3600
            },
            contentSecurityPolicy: {
                polices: [
                    { name: 'default-src', value: "'self'" },
                    { name: 'child-src', value: "'self'" }
                ]
            }
        });
        // Add console logger.
        this.addLogger(new Backend.Loggers.Console());
        // Add HTTP service.
        this.addService(new Backend.Services.Server({
            debug: true,
            port: 8080
        }));
        // Add request handler.
        this.addHandler(handler_1.Handler);
        // Automatic start.
        this.start();
    }
};
Example = __decorate([
    Class.Describe()
], Example);
// Start application.
new Example();
//# sourceMappingURL=main.js.map