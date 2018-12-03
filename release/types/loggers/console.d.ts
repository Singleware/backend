/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import { Request, Logger } from '../types';
/**
 * Back-end HTTP logger class.
 */
export declare class Console extends Class.Null implements Logger {
    /**
     * Gets the request header from the specified request information.
     * @param type Header type.
     * @param request Request information.
     * @returns Returns the request header.
     */
    private getHeader;
    /**
     * Receive handler.
     * @param request Request information.
     */
    onReceive(request: Request): void;
    /**
     * Process handler.
     * @param request Request information.
     */
    onProcess(request: Request): void;
    /**
     * Send handler.
     * @param request Request information.
     */
    onSend(request: Request): void;
    /**
     * Error handler.
     * @param request Request information.
     */
    onError(request: Request): void;
}
