import * as Class from '@singleware/class';
import * as Types from '../../types';
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
    exceptionResponse(match: Types.Match): void;
    /**
     * Default response processor.
     * @param match Matched route.
     */
    defaultResponse(match: Types.Match): Promise<void>;
}
