/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Aliases from '../aliases';
/**
 * Back-end HTTP logger class.
 */
export declare class Console extends Class.Null implements Aliases.Logger {
    /**
     * Map of request entries.
     */
    private entryMap;
    /**
     * Gets the specified value filled by the given digit character and the minimum length.
     * @param value Input value.
     * @param length Minimum length
     * @param digit Digit character.
     * @returns Returns the filled string.
     */
    private getFilledValue;
    /**
     * Gets the current time string.
     * @returns Returns the current time string.
     */
    private getCurrentTime;
    /**
     * Gets the difference between the specified time and the current time.
     * @param time Time object.
     * @returns Returns the difference time.
     */
    private getElapsedTime;
    /**
     * Gets the request resume for the specified request information.
     * @param request Request information.
     * @returns Returns the request resume.
     */
    private getRequestResume;
    /**
     * Receive handler.
     * @param request Request information.
     */
    onReceive(request: Aliases.Request): void;
    /**
     * Process handler.
     * @param request Request information.
     */
    onProcess(request: Aliases.Request): void;
    /**
     * Send handler.
     * @param request Request information.
     */
    onSend(request: Aliases.Request): void;
    /**
     * Error handler.
     * @param request Request information.
     */
    onError(request: Aliases.Request): void;
    /**
     * Start handler.
     */
    onStart(): void;
    /**
     * Stop handler.
     */
    onStop(): void;
}
