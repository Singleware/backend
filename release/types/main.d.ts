import * as Application from '@singleware/application';
import * as Security from './security';
import * as Response from './services/response';
import * as Request from './services/request';
import { Callable, Variables } from './types';
import { Settings } from './settings';
/**
 * Back-end application class.
 */
export declare class Main extends Application.Main<Request.Input, Response.Output> {
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
    protected setSecurityHeaders(output: Response.Output, input: Request.Input, variables: Variables): void;
    /**
     * Process event handler.
     * @param match Matched routes.
     * @param callback Handler callback.
     */
    protected processHandler(match: Application.Match<Request.Input, Response.Output>, callback: Callable): Promise<void>;
    /**
     * Default constructor.
     * @param settings Application settings.
     */
    constructor(settings: Settings);
    /**
     * Set the CORS headers.
     * @param output Output information.
     * @param cors CORS information.
     */
    protected static setCORS(output: Response.Output, input: Request.Input, cors: Security.CORS): void;
    /**
     * Set the HSTS headers.
     * @param output Output information.
     * @param hsts HSTS information.
     */
    protected static setHSTS(output: Response.Output, hsts: Security.HSTS): void;
}
