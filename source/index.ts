/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Handlers from './handlers';
export import Handlers = Handlers;

import * as Loggers from './loggers';
export import Loggers = Loggers;

import * as Requests from './requests';
export import Requests = Requests;

import * as Responses from './responses';
export import Responses = Responses;

import * as Services from './services';
export import Services = Services;

import * as Security from './security';
export import Security = Security;

import * as Types from './types';
export import Types = Types;

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
