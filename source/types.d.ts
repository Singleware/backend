/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Application from '@singleware/application';

import * as Request from './services/request';
import * as Response from './services/response';

/**
 * Type declaration for callable members.
 */
export type Callable<T = any> = Class.Callable;

/**
 * Type declaration for member decorators.
 */
export type MemberDecorator = <T>(target: Object, property: string | symbol, descriptor?: TypedPropertyDescriptor<T>) => any;

/**
 * Type declaration for application route match.
 */
export type Match = Application.Match<Request.Input, Response.Output>;

/**
 * Type declaration for application route variables.
 */
export type Variables = Application.Variables;

/**
 * Type declaration for application request.
 */
export type Request = Application.Request<Request.Input, Response.Output>;

/**
 * Type declaration for application service.
 */
export type Service = Application.Service<Request.Input, Response.Output>;

/**
 * Type declaration for application logger.
 */
export type Logger = Application.Logger<Request.Input, Response.Output>;
