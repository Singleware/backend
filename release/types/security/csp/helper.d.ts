/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Aliases from '../../aliases';
import { Settings } from './settings';
/**
 * CSP helper class.
 */
export declare class Helper extends Class.Null {
    /**
     * Build and get the concatenated policy values from the specified list of polices.
     * @param list List of polices.
     * @returns Returns the policy values or undefined when the policy list is empty.
     */
    private static buildConcatenatedPolices;
    /**
     * Set all the CSP headers in the specified request.
     * @param request Request information.
     * @param settings CSP settings.
     */
    static setHeaders(request: Aliases.Request, settings: Settings): void;
}
