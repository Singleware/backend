import * as Class from '@singleware/class';
import * as Observable from '@singleware/observable';
import * as Aliases from '../aliases';
import { Settings } from './settings';
/**
 * Back-end HTTP service class.
 */
export declare class Server extends Class.Null implements Aliases.Service {
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
    get onReceive(): Observable.Subject<Aliases.Request>;
    /**
     * Send response event.
     */
    get onSend(): Observable.Subject<Aliases.Request>;
    /**
     * Error response event.
     */
    get onError(): Observable.Subject<Aliases.Request>;
    /**
     * Starts the service listening.
     */
    start(): void;
    /**
     * Stops the service listening.
     */
    stop(): void;
}
