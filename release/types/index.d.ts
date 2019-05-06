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
import { Action } from './action';
/**
 * Decorates the specified member to filter an application request. (Alias for Main.Filter)
 * @param action Filter action settings.
 * @returns Returns the decorator method.
 */
export declare const Filter: (action: Action) => Types.MemberDecorator;
/**
 * Decorates the specified member to process an application request. (Alias for Main.Processor)
 * @param action Route action settings.
 * @returns Returns the decorator method.
 */
export declare const Processor: (action: Action) => Types.MemberDecorator;
