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
import * as Security from './security';
export import Security = Security;
import * as Module from './main';
export import Main = Module.Main;
import { MemberDecorator } from './types';
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
