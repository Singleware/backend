import * as Application from '@singleware/application';
import * as Requests from './requests';
import * as Responses from './responses';
/**
 * Type declaration for callable members.
 */
export declare type Callable<T = any> = (...parameters: any[]) => T;
/**
 * Type declaration for member decorators.
 */
export declare type MemberDecorator = <T>(target: Object, property: string | symbol, descriptor: TypedPropertyDescriptor<T>) => any;
/**
 * Type declaration for application request.
 */
export declare type Request = Application.Request<Requests.Input, Responses.Output>;
/**
 * Type declaration for application service.
 */
export declare type Service = Application.Service<Requests.Input, Responses.Output>;
/**
 * Type declaration for application logger.
 */
export declare type Logger = Application.Logger<Requests.Input, Responses.Output>;
/**
 * Type declaration for application route match.
 */
export declare type Match = Application.Match<Requests.Input, Responses.Output>;
/**
 * Type declaration for application route variables.
 */
export declare type Variables = Application.Variables;
