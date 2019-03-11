import * as Class from '@singleware/class';
import * as Types from '../types';
/**
 * Back-end HTTP logger class.
 */
export declare class Console extends Class.Null implements Types.Logger {
    /**
     * Map of request entries.
     */
    private entryMap;
    /**
     * Gets the specified value filled by the given digit character and the minimum length.
     * @param value Input value.
     * @param length Minimum length
     * @param digit Digit character.
     * @returns Returns the filled string.
     */
    private getFilledValue;
    /**
     * Gets the current time string.
     * @returns Returns the current time string.
     */
    private getCurrentTime;
    /**
     * Gets the difference between the specified time and the current time.
     * @param time Time object.
     * @returns Returns the difference time.
     */
    private getDifferenceTime;
    /**
     * Gets the request resume for the specified request information.
     * @param request Request information.
     * @returns Returns the request resume.
     */
    private getRequestResume;
    /**
     * Receive handler.
     * @param request Request information.
     */
    onReceive(request: Types.Request): void;
    /**
     * Process handler.
     * @param request Request information.
     */
    onProcess(request: Types.Request): void;
    /**
     * Send handler.
     * @param request Request information.
     */
    onSend(request: Types.Request): void;
    /**
     * Error handler.
     * @param request Request information.
     */
    onError(request: Types.Request): void;
    /**
     * Start handler.
     */
    onStart(): void;
    /**
     * Stop handler.
     */
    onStop(): void;
}
