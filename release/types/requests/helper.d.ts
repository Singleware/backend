import * as Class from '@singleware/class';
import { Search } from './search';
/**
 * Request helper class.
 */
export declare class Helper extends Class.Null {
    /**
     * Generate a new map containing all search parameters from the specified search string.
     * @param search Search string.
     * @returns Returns the map containing all parameters parsed from the given search string.
     */
    static parseURLSearch(search: string): Search;
    /**
     * Generate a new string containing all search parameters from the specified search map.
     * @param search Search map.
     * @returns Returns the string corresponding to the given search map.
     */
    static stringfyURLSearch(search: Search): string;
}
