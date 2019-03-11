"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Services = require("./services");
exports.Services = Services;
exports.Response = Services.Response.Helper;
const Loggers = require("./loggers");
exports.Loggers = Loggers;
const Handlers = require("./handlers");
exports.Handlers = Handlers;
const Security = require("./security");
exports.Security = Security;
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
