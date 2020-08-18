"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tests = exports.Security = exports.Services = exports.Responses = exports.Requests = exports.Loggers = exports.Handlers = exports.Processor = exports.Filter = void 0;
/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
var main_1 = require("./main");
Object.defineProperty(exports, "Main", { enumerable: true, get: function () { return main_1.Main; } });
var aliases_1 = require("./aliases");
Object.defineProperty(exports, "Match", { enumerable: true, get: function () { return aliases_1.Match; } });
// Declarations
const Application = require("@singleware/application");
/**
 * Decorates the specified member to filter an application request. (Alias for Main.Filter)
 * @param action Filter action settings.
 * @returns Returns the decorator method.
 */
exports.Filter = (action) => Application.Main.Filter(action);
/**
 * Decorates the specified member to process an application request. (Alias for Main.Processor)
 * @param action Route action settings.
 * @returns Returns the decorator method.
 */
exports.Processor = (action) => Application.Main.Processor(action);
// Imported aliases.
const Handlers = require("./handlers");
const Loggers = require("./loggers");
const Requests = require("./requests");
const Responses = require("./responses");
const Services = require("./services");
const Security = require("./security");
const Tests = require("./tests");
/**
 * Handlers namespace.
 */
exports.Handlers = Handlers;
/**
 * Loggers namespace.
 */
exports.Loggers = Loggers;
/**
 * Requests namespace.
 */
exports.Requests = Requests;
/**
 * Responses namespace.
 */
exports.Responses = Responses;
/**
 * Services namespace.
 */
exports.Services = Services;
/**
 * Security namespace.
 */
exports.Security = Security;
/**
 * Tests namespace.
 */
exports.Tests = Tests;
//# sourceMappingURL=index.js.map