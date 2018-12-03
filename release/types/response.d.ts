/// <reference types="node" />
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import { Headers } from './headers';
import { Output } from './output';
/**
 * Application response helper class.
 */
export declare class Response extends Class.Null {
    /**
     * Messages by status.
     */
    private static messages;
    /**
     * Set a response header.
     * @param output Output information.
     * @param name Header name.
     * @param value Header value.
     */
    static setHeader(output: Output, name: string, value: string | string[]): void;
    /**
     * Set multi response headers.
     * @param output Output information.
     * @param headers Headers to be set.
     */
    static setMultiHeaders(output: Output, headers: Headers): void;
    /**
     * Set the response status.
     * @param output Output information.
     * @param status Status code.
     */
    static setStatus(output: Output, status: number): void;
    /**
     * Set the response content.
     * @param output Output information.
     * @param data Output data.
     * @param mime Output MIME type.
     */
    static setContent(output: Output, data: string | Buffer, mime?: string): void;
    /**
     * Set the response content attachment.
     * @param output Output information.
     * @param name Downloaded file name.
     * @param data Output data to download.
     * @param mime Output MIME type.
     */
    static setContentAttachment(output: Output, name: string, data: string | Buffer, mime?: string): void;
    /**
     * Set the response content JSON.
     * @param output Output information.
     * @param content Output content.
     */
    static setContentJson<T extends Object>(output: Output, content: T): void;
    /**
     * Set the response status and the response content JSON.
     * @param output Output information.
     * @param status Output status.
     * @param message Output message.
     */
    static setStatusJson(output: Output, status: number, message?: string): void;
}
