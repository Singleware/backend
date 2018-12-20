import * as Class from '@singleware/class';
import { Search } from './search';
/**
 * Request helper class.
 */
export declare class Helper extends Class.Null {
    /**
     * Set the response status and the response content JSON.
     * @param output Output entity.
     * @param status Output status.
     * @param message Output message.
     */
    static getSearchMap(search: string): Search;
}
