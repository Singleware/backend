/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
export { Match } from './types';

import * as Services from './services';
export import Services = Services;
export import Response = Services.Response.Helper;
export import Input = Services.Request.Input;
export import Output = Services.Response.Output;

import * as Loggers from './loggers';
export import Loggers = Loggers;

import * as Handlers from './handlers';
export import Handlers = Handlers;

import * as Module from './main';
export import Main = Module.Main;

/**
 * Declarations.
 */
import * as Application from '@singleware/application';

import { MemberDecorator } from './types';
import { Action } from './action';

/**
 * Decorates the specified member to filter an application request. (Alias for Main.Filter)
 * @param action Filter action settings.
 * @returns Returns the decorator method.
 */
export const Filter = (action: Action): MemberDecorator => Application.Main.Filter(action);

/**
 * Decorates the specified member to process an application request. (Alias for Main.Processor)
 * @param action Route action settings.
 * @returns Returns the decorator method.
 */
export const Processor = (action: Action): MemberDecorator => Application.Main.Processor(action);
