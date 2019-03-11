import * as Class from '@singleware/class';
import * as Types from '../../types';
import { Settings } from './settings';
/**
 * CORS helper class.
 */
export declare class Helper extends Class.Null {
    /**
     * Set all the CORS headers in the specified request.
     * @param request Request information.
     * @param settings CORS settings.
     */
    static setHeaders(request: Types.Request, settings: Settings): void;
}
