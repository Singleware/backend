import * as Application from '@singleware/application';
import * as Types from './types';
import * as Responses from './responses';
import * as Requests from './requests';
import { Settings } from './settings';
/**
 * Back-end application class.
 */
export declare class Main extends Application.Main<Requests.Input, Responses.Output> {
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
     * Filter handler to be inherited and extended.
     * @param match Match information.
     * @param allowed Determine whether the filter is allowing the request matching or not.
     * @returns Returns true when the filter handler still allows the request matching or false otherwise.
     */
    protected filterHandler(match: Types.Match, allowed: boolean): Promise<boolean>;
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
