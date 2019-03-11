import * as Class from '@singleware/class';
import * as Types from '../../types';
import { Settings } from './settings';
/**
 * HSTS helper class.
 */
export declare class Helper extends Class.Null {
    /**
     * Set all the HSTS headers in the specified request.
     * @param request Request information.
     * @param settings HSTS settings.
     */
    static setHeaders(request: Types.Request, settings: Settings): void;
}
