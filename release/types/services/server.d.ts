import * as Class from '@singleware/class';
import * as Observable from '@singleware/observable';
import * as Types from '../types';
import { Settings } from './settings';
/**
 * Back-end HTTP service class.
 */
export declare class Server extends Class.Null implements Types.Service {
    /**
     * HTTP server.
     */
    private server;
    /**
     * Service settings.
     */
    private settings;
    /**
     * Receive subject instance.
     */
    private receiveSubject;
    /**
     * Send subject instance.
     */
    private sendSubject;
    /**
     * Error subject instance.
     */
    private errorSubject;
    /**
     * Gets an error request based on the specified Request entity.
     * @param request Request entity.
     * @returns Returns the new error request.
     */
    private getErrorRequest;
    /**
     * Response send handler.
     * @param request Request entity.
     */
    private sendHandler;
    /**
     * Request error handler.
     * @param request Request entity.
     * @param error Error entity.
     */
    private errorHandler;
    /**
     * Request receive data handler.
     * @param request Request entity.
     * @param buffer Buffer chunk.
     */
    private receiveHandler;
    /**
     * Response event handler.
     * @param request Request entity.
     * @param response Response manager.
     */
    private responseHandler;
    /**
     * Close event handler.
     * @param request Request entity.
     * @param response Response manager.
     */
    private closeHandler;
    /**
     * Request event handler.
     * @param incoming Incoming message.
     * @param response Response message.
     */
    private requestHandler;
    /**
     * Default constructor.
     * @param settings Application settings.
     */
    constructor(settings: Settings);
    /**
     * Receive request event.
     */
    readonly onReceive: Observable.Subject<Types.Request>;
    /**
     * Send response event.
     */
    readonly onSend: Observable.Subject<Types.Request>;
    /**
     * Error response event.
     */
    readonly onError: Observable.Subject<Types.Request>;
    /**
     * Starts the service listening.
     */
    start(): void;
    /**
     * Stops the service listening.
     */
    stop(): void;
}
