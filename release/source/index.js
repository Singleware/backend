"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var response_1 = require("./response");
exports.Response = response_1.Response;
const Loggers = require("./loggers");
exports.Loggers = Loggers;
const Services = require("./services");
exports.Services = Services;
const Handlers = require("./handlers");
exports.Handlers = Handlers;
const Module = require("./main");
exports.Main = Module.Main;
/**
 * Declarations.
 */
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
