import * as Class from '@singleware/class';
import { Search } from './search';
/**
 * Request helper class.
 */
export declare class Helper extends Class.Null {
    /**
     * Gets one map containing all search parameters from the specified search string.
     * @param search Search string.
     * @returns Returns the map containing all parameters acquired from the given search string.
     */
    static parseURLSearch(search: string): Search;
}
