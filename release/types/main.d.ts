import * as Application from '@singleware/application';
import * as Security from './security';
import { Callable, Variables } from './types';
import { Settings } from './settings';
import { Input } from './input';
import { Output } from './output';
/**
 * Back-end application class.
 */
export declare class Main extends Application.Main<Input, Output> {
    /**
     * Application settings.
     */
    protected settings: Settings;
    /**
     * Set all security headers into the output.
     * @param output Output information.
     * @param input Input information.
     * @param variables Route variables.
     */
    protected setSecurityHeaders(output: Output, input: Input, variables: Variables): void;
    /**
     * Process event handler.
     * @param match Matched routes.
     * @param callback Handler callback.
     */
    protected processHandler(match: Application.Match<Input, Output>, callback: Callable): Promise<void>;
    /**
     * Default constructor.
     * @param settings Application settings.
     */
    constructor(settings: Settings);
    /**
     * Gets the current timestamp value in seconds.
     * @param increment Incremental seconds.
     * @returns Returns the sum of current timestamp and the incremental seconds.
     */
    protected static getTimestamp(increment: number): number;
    /**
     * Set the CORS headers.
     * @param output Output information.
     * @param cors CORS information.
     */
    protected static setCORS(output: Output, input: Input, cors: Security.CORS): void;
    /**
     * Set the HSTS headers.
     * @param output Output information.
     * @param hsts HSTS information.
     */
    protected static setHSTS(output: Output, hsts: Security.HSTS): void;
}
