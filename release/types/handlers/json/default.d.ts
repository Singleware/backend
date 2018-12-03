/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import { Match } from '../../types';
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
     * Default constructor.
     * @param settings Handler settings.
     */
    constructor(settings: Settings);
    /**
     * Exception response processor.
     * @param match Matched route.
     */
    exceptionResponse(match: Match): void;
    /**
     * Default response processor.
     * @param match Matched route.
     */
    defaultResponse(match: Match): Promise<void>;
}
