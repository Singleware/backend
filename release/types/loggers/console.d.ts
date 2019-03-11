import * as Class from '@singleware/class';
import { Request, Logger } from '../types';
/**
 * Back-end HTTP logger class.
 */
export declare class Console extends Class.Null implements Logger {
    /**
     * Gets the a new header for the specified type.
     * @param type Header type.
     * @returns Returns the new header.
     */
    private getHeader;
    /**
     * Gets the a new request data for the specified request information.
     * @param request Request information.
     * @returns Returns the new request header.
     */
    private getRequest;
    /**
     * Receive handler.
     * @param request Request information.
     */
    onReceive(request: Request): void;
    /**
     * Process handler.
     * @param request Request information.
     */
    onProcess(request: Request): void;
    /**
     * Send handler.
     * @param request Request information.
     */
    onSend(request: Request): void;
    /**
     * Error handler.
     * @param request Request information.
     */
    onError(request: Request): void;
    /**
     * Start handler.
     */
    onStart(): void;
    /**
     * Stop handler.
     */
    onStop(): void;
}
