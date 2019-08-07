/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
export { Main } from './main';
export { Request, Service, Logger, Variables, Environment, Match } from './aliases';
import { MemberDecorator } from './aliases';
import { Action } from './action';
/**
 * Decorates the specified member to filter an application request. (Alias for Main.Filter)
 * @param action Filter action settings.
 * @returns Returns the decorator method.
 */
export declare const Filter: (action: Action) => MemberDecorator;
/**
 * Decorates the specified member to process an application request. (Alias for Main.Processor)
 * @param action Route action settings.
 * @returns Returns the decorator method.
 */
export declare const Processor: (action: Action) => MemberDecorator;
import * as Handlers from './handlers';
import * as Loggers from './loggers';
import * as Requests from './requests';
import * as Responses from './responses';
import * as Services from './services';
import * as Security from './security';
import * as Tests from './tests';
/**
 * Handlers namespace.
 */
export import Handlers = Handlers;
/**
 * Loggers namespace.
 */
export import Loggers = Loggers;
/**
 * Requests namespace.
 */
export import Requests = Requests;
/**
 * Responses namespace.
 */
export import Responses = Responses;
/**
 * Services namespace.
 */
export import Services = Services;
/**
 * Security namespace.
 */
export import Security = Security;
/**
 * Tests namespace.
 */
export import Tests = Tests;
