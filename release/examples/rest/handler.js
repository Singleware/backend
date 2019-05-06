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
const Class = require("@singleware/class");
const Backend = require("../../source");
/**
 * External handler, example class.
 */
let Handler = class Handler extends Backend.Handlers.Json.Default {
    /**
     * Error processor.
     * @param match Request match.
     */
    errorProcessor(match) {
        super.exceptionResponse(match);
    }
    /**
     * Default processor.
     * @param match Request match.
     */
    defaultProcessor(match) {
        super.defaultResponse(match);
    }
    /**
     * List tests, request processor.
     * @param match Request match.
     */
    listProcessor(match) {
        Backend.Responses.Helper.setStatusJson(match.detail.output, 200);
    }
    /**
     * Create test, request processor.
     * @param match Request match.
     */
    createProcessor(match) {
        Backend.Responses.Helper.setStatusJson(match.detail.output, 201);
    }
    /**
     * Read test, request processor.
     * @param match Request match.
     */
    readProcessor(match) {
        Backend.Responses.Helper.setStatusJson(match.detail.output, 200);
    }
    /**
     * Update test, request processor.
     * @param match Request match.
     */
    updateProcessor(match) {
        Backend.Responses.Helper.setStatusJson(match.detail.output, 200);
    }
    /**
     * Delete test, request processor.
     * @param match Request match.
     */
    deleteProcessor(match) {
        Backend.Responses.Helper.setStatusJson(match.detail.output, 200);
    }
};
__decorate([
    Class.Public(),
    Backend.Processor({ path: '#', exact: false, environment: { methods: '*' } })
], Handler.prototype, "errorProcessor", null);
__decorate([
    Class.Public(),
    Backend.Processor({ path: '/', exact: false, environment: { methods: '*' } })
], Handler.prototype, "defaultProcessor", null);
__decorate([
    Class.Public(),
    Backend.Processor({ path: '/tests', environment: { methods: 'GET' } })
], Handler.prototype, "listProcessor", null);
__decorate([
    Class.Public(),
    Backend.Processor({ path: '/tests', environment: { methods: 'POST' } })
], Handler.prototype, "createProcessor", null);
__decorate([
    Class.Public(),
    Backend.Processor({ path: '/tests/{id}', constraint: { id: /[0-9]*/ }, environment: { methods: 'GET' } })
], Handler.prototype, "readProcessor", null);
__decorate([
    Class.Public(),
    Backend.Processor({ path: '/tests/{id}', constraint: { id: /[0-9]*/ }, environment: { methods: 'PATCH' } })
], Handler.prototype, "updateProcessor", null);
__decorate([
    Class.Public(),
    Backend.Processor({ path: '/tests/{id}', constraint: { id: /[0-9]*/ }, environment: { methods: 'DELETE' } })
], Handler.prototype, "deleteProcessor", null);
Handler = __decorate([
    Class.Describe()
], Handler);
exports.Handler = Handler;
