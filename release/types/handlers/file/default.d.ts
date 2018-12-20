/// <reference types="node" />
import * as Class from '@singleware/class';
import * as Response from '../../services/response';
import { Match } from '../../types';
import { Settings } from './settings';
/**
 * Default file handler class.
 */
export declare class Default extends Class.Null {
    /**
     * Assets path.
     */
    private static assetsPath;
    /**
     * Handler settings.
     */
    private settings;
    /**
     * Gets the MIME type that corresponds to the extension of the specified file.
     * @param path File path.
     * @returns Returns the corresponding MIME type or undefined when the type was not found.
     */
    protected getMimeType(path: string): string | undefined;
    /**
     * Read all content of the specified file.
     * @param path File path.
     * @returns Returns the file content.
     */
    protected readFile(path: string): Promise<Buffer>;
    /**
     * Test whether the specified file exists or not.
     * @param path File path.
     * @returns Returns the promise to get true when the file exists or false otherwise.
     */
    protected fileExists(path: string): Promise<boolean>;
    /**
     * Sets the content of a default error file into the give output response.
     * @param output Output response.
     * @param status Output status.
     * @param information Error information.
     */
    protected setResponseError(output: Response.Output, status: number, information: string): Promise<void>;
    /**
     * Set the content of the specified file into the given output response.
     * @param output Output response.
     * @param path File path.
     */
    protected setResponseFile(output: Response.Output, path: string): Promise<void>;
    /**
     * Default constructor.
     * @param settings Handler settings.
     */
    constructor(settings: Settings);
    /**
     * Exception response processor.
     * @param match Matched rote.
     */
    exceptionResponse(match: Match): Promise<void>;
    /**
     * Default response processor.
     * @param match Matched rote.
     */
    defaultResponse(match: Match): Promise<void>;
    /**
     * Gets the base directory.
     */
    readonly baseDirectory: string;
    /**
     * Gets the index file.
     */
    readonly indexFile: string;
    /**
     * Gets the strict types status.
     */
    readonly strictTypes: boolean;
    /**
     * Gets the handler types.
     */
    readonly types: Response.Types;
}
