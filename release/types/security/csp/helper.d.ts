import * as Class from '@singleware/class';
import * as Types from '../../types';
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
    static setHeaders(request: Types.Request, settings: Settings): void;
}
