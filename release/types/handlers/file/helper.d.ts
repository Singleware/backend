import * as Class from '@singleware/class';
/**
 * File helper class.
 */
export declare class Helper extends Class.Null {
    /**
     * Read all contents of the specified file.
     * @param path File path.
     * @returns Returns the file content.
     */
    static readFile(path: string): Promise<Buffer>;
    /**
     * Test whether the specified file exists or not.
     * @param path File path.
     * @returns Returns the promise to get true when the file exists or false otherwise.
     */
    static fileExists(path: string): Promise<boolean>;
}
