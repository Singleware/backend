/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Application from '@singleware/application';

import * as Requests from './requests';
import * as Responses from './responses';

/**
 * Type declaration for callable members.
 */
export type Callable<T = any> = (...parameters: any[]) => T;

/**
 * Type declaration for member decorators.
 */
export type MemberDecorator = <T>(target: Object, property: string | symbol, descriptor: TypedPropertyDescriptor<T>) => any;

/**
 * Type declaration for application request.
 */
export type Request = Application.Request<Requests.Input, Responses.Output>;

/**
 * Type declaration for application service.
 */
export type Service = Application.Service<Requests.Input, Responses.Output>;

/**
 * Type declaration for application logger.
 */
export type Logger = Application.Logger<Requests.Input, Responses.Output>;

/**
 * Type declaration for application route match.
 */
export type Match = Application.Match<Requests.Input, Responses.Output>;

/**
 * Type declaration for application route variables.
 */
export type Variables = Application.Variables;
