import * as Http from 'http';
import * as Class from '@singleware/class';
import { Request, Variables } from '../types';
import { Headers } from './headers';
import { Search } from './request';
/**
 * Back-end helper class.
 */
export declare class Helper extends Class.Null {
    /**
     * Gets the first header value from the specified header information.
     * @param header Header information.
     * @returns Returns the first header value or undefined when there is no header value.
     */
    private static getFirstHeaderValue;
    /**
     * Gets the remote address from the specified incoming message.
     * @param incoming Incoming message.
     * @returns Returns the remote address from the incoming message or undefined when there is no remote address.
     */
    static getRemoteAddress(incoming: Http.IncomingMessage): string | undefined;
    /**
     * Gets the remote port from the specified incoming message.
     * @param incoming Incoming message.
     * @returns Returns the remote port from the incoming message or undefined when there is no remote port.
     */
    static getRemotePort(incoming: Http.IncomingMessage): number | undefined;
    /**
     * Gets a new request with the specified parameters.
     * @param address Request address.
     * @param port Request port.
     * @param method Request method.
     * @param path Request path
     * @param search Request search parameters.
     * @param headers Request headers.
     * @param variables Request variables.
     * @returns Returns the new request information.
     */
    static getRequest(address: string, port: number, method: string, path: string, search: Search, headers: Headers, variables: Variables): Request;
}
