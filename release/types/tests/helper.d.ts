/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Aliases from '../aliases';
import { Options } from './options';
/**
 * Tests helper class.
 */
export declare class Helper extends Class.Null {
    /**
     * Default request options.
     */
    private static defaultOptions;
    /**
     * Creates a new fake application request based on the specified options.
     * @param options Request options.
     * @returns Returns the generated application request.
     */
    private static getRequest;
    /**
     * Creates a new fake request matching for test purposes.
     * @param options Request options.
     * @returns Returns the generated request matching.
     */
    static createMatch(options?: Options): Aliases.Match;
}
