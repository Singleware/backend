"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Handlers = require("./handlers");
exports.Handlers = Handlers;
const Loggers = require("./loggers");
exports.Loggers = Loggers;
const Requests = require("./requests");
exports.Requests = Requests;
const Responses = require("./responses");
exports.Responses = Responses;
const Services = require("./services");
exports.Services = Services;
const Security = require("./security");
exports.Security = Security;
const Types = require("./types");
exports.Types = Types;
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
