import * as Class from '@singleware/class';
import { Headers } from '../headers';
import { Output } from './output';
/**
 * Response helper class.
 */
export declare class Helper extends Class.Null {
    /**
     * Messages by status.
     */
    private static messages;
    /**
     * Set one response header.
     * @param output Output entity.
     * @param name Header name.
     * @param value Header value.
     */
    static setHeader(output: Output, name: string, value: number | string | string[]): void;
    /**
     * Set multiple response headers.
     * @param output Output entity.
     * @param headers Headers to be set.
     */
    static setMultipleHeaders(output: Output, headers: Headers): void;
    /**
     * Set the response status.
     * @param output Output entity.
     * @param status Status code.
     * @throws Throws a type error when the status does not exists and an error when the status 204 is set up with content data.
     */
    static setStatus(output: Output, status: number): void;
    /**
     * Set the response content.
     * @param output Output entity.
     * @param data Output data.
     * @param type Output MIME type.
     * @throws Throws an error when the content is set with status 204.
     */
    static setContent(output: Output, data: string | Buffer, type?: string): void;
    /**
     * Set the response content attachment.
     * @param output Output entity.
     * @param name Downloaded file name.
     * @param data Output data to download.
     * @param type Output MIME type.
     */
    static setContentAttachment(output: Output, name: string, data: string | Buffer, type?: string): void;
    /**
     * Set the response content JSON.
     * @param output Output entity.
     * @param content Output content.
     */
    static setContentJson<T extends Object>(output: Output, content: T): void;
    /**
     * Set the response status and the response content JSON.
     * @param output Output entity.
     * @param status Output status.
     * @param message Output message.
     */
    static setStatusJson(output: Output, status: number, message?: string): void;
}
