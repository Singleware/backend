import * as Application from '@singleware/application';
import * as Types from './types';
import * as Response from './services/response';
import * as Request from './services/request';
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
     * Determines whether the specified method is allowed or not.
     * @param request Method name.
     * @param methods Allowed method list.
     * @returns Returns true when the request method is allowed, false otherwise.
     */
    private isAllowedMethod;
    /**
     * Set all response headers into the specified request.
     * @param request Request information.
     * @param variables Route variables.
     */
    private setResponseHeaders;
    /**
     * Process event handler.
     * @param match Matched routes.
     * @param callback Handler callback.
     */
    protected processHandler(match: Types.Match, callback: Types.Callable): Promise<void>;
    /**
     * Default constructor.
     * @param settings Application settings.
     */
    constructor(settings: Settings);
}
