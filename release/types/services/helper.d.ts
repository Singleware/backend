/// <reference types="node" />
/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Http from 'http';
import * as Class from '@singleware/class';
import * as Types from '../aliases';
import * as Requests from '../requests';
import { Headers } from '../headers';
/**
 * Services helper class.
 */
export declare class Helper extends Class.Null {
    /**
     * Get the first header value from the specified header.
     * @param header Header.
     * @returns Returns the first header value or undefined when there's no header value.
     */
    private static getFirstHeaderValue;
    /**
     * Gets the requested domain name.
     * @param incoming Incoming message.
     * @returns Returns the requested domain name or undefined when there's no incoming host header.
     */
    static getDomainName(incoming: Http.IncomingMessage): string | undefined;
    /**
     * Get the remote address from the specified incoming message.
     * @param incoming Incoming message.
     * @returns Returns the remote address from the incoming message or undefined when there is no remote address.
     */
    static getRemoteAddress(incoming: Http.IncomingMessage): string | undefined;
    /**
     * Get the remote port from the specified incoming message.
     * @param incoming Incoming message.
     * @returns Returns the remote port from the incoming message or undefined when there is no remote port.
     */
    static getRemotePort(incoming: Http.IncomingMessage): number | undefined;
    /**
     * Get a new request with the specified parameters.
     * @param connection Request connection.
     * @param method Request method.
     * @param domain Request domain.
     * @param path Request path
     * @param search Request search parameters.
     * @param headers Request headers.
     * @param variables Request variables.
     * @returns Returns the new request information.
     */
    static getRequest(connection: Requests.Connection, method: string, domain: string, path: string, search: Requests.Search, headers: Headers, variables: Types.Variables): Types.Request;
}
