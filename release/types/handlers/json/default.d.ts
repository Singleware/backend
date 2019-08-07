/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Aliases from '../../aliases';
import * as Responses from '../../responses';
import { Headers } from '../../headers';
import { Settings } from './settings';
/**
 * Default JSON handler class.
 */
export declare class Default extends Class.Null {
    /**
     * Handler settings.
     */
    private settings;
    /**
     * Sets the specified output with the given response status, code and text.
     * @param output Output entity.
     * @param status Output status.
     * @param code Optional output code.
     * @param text Optional output text.
     */
    protected setResponseStatus(output: Responses.Output, status: number, code?: number, text?: string): void;
    /**
     * Sets the specified output with the given response status and content.
     * @param output Output entity.
     * @param status Output status.
     * @param content Output content.
     */
    protected setResponseContent<T extends Object>(output: Responses.Output, status: number, content: T): void;
    /**
     * Sets the specified output with the given response status and headers.
     * @param output Output entity.
     * @param status Output status.
     * @param headers Output headers.
     */
    protected setResponseHeaders(output: Responses.Output, status: number, headers: Headers): void;
    /**
     * Default constructor.
     * @param settings Handler settings.
     */
    constructor(settings: Settings);
    /**
     * Exception response processor.
     * @param match Matched route.
     */
    exceptionResponse(match: Aliases.Match): Promise<void>;
    /**
     * Default response processor.
     * @param match Matched route.
     */
    defaultResponse(match: Aliases.Match): Promise<void>;
}
