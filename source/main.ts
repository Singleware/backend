/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Application from '@singleware/application';

import * as Types from './types';
import * as Security from './security';
import * as Responses from './responses';
import * as Requests from './requests';

import { Settings } from './settings';
import { Environment } from './environment';

/**
 * Back-end application class.
 */
@Class.Describe()
export class Main extends Application.Main<Requests.Input, Responses.Output> {
  /**
   * Application settings.
   */
  @Class.Protected()
  protected settings: Settings;

  /**
   * Determines whether the specified method is allowed or not.
   * @param request Method name.
   * @param methods Allowed method list.
   * @returns Returns true when the request method is allowed, false otherwise.
   */
  @Class.Private()
  private isAllowedMethod(method: string, methods: string | string[]): boolean {
    return (methods instanceof Array && methods.includes(method)) || methods === method || methods === '*';
  }

  /**
   * Set all response headers into the specified request.
   * @param request Request information.
   * @param variables Route variables.
   */
  @Class.Private()
  private setResponseHeaders(request: Types.Request, variables: Environment): void {
    if (this.settings.contentSecurityPolicy || variables.contentSecurityPolicy) {
      Security.CSP.Helper.setHeaders(request, <Security.CSP.Settings>{
        ...this.settings.contentSecurityPolicy,
        ...variables.contentSecurityPolicy
      });
    }
    if (this.settings.crossOriginRequestSharing || variables.crossOriginRequestSharing) {
      Security.CORS.Helper.setHeaders(request, <Security.CORS.Settings>{
        ...this.settings.crossOriginRequestSharing,
        ...variables.crossOriginRequestSharing
      });
    }
    if (this.settings.httpStrictTransportSecurity || variables.httpStrictTransportSecurity) {
      Security.HSTS.Helper.setHeaders(request, <Security.HSTS.Settings>{
        ...this.settings.httpStrictTransportSecurity,
        ...variables.httpStrictTransportSecurity
      });
    }
  }

  /**
   * Filter handler to be inherited and extended.
   * @param match Match information.
   * @param allowed Determine whether the filter is allowing the request matching or not.
   * @returns Returns true when the filter handler still allows the request matching or false otherwise.
   */
  @Class.Protected()
  protected async filterHandler(match: Types.Match, allowed: boolean): Promise<boolean> {
    if (!allowed) {
      this.setResponseHeaders(match.detail, <Environment>match.variables);
    }
    return allowed;
  }

  /**
   * Process event handler.
   * @param match Matched routes.
   * @param callback Handler callback.
   */
  @Class.Protected()
  protected async processHandler(match: Types.Match, callback: Types.Callable): Promise<void> {
    if (this.isAllowedMethod(match.detail.input.method, match.variables.methods)) {
      this.setResponseHeaders(match.detail, <Environment>match.variables);
      await super.processHandler(match, callback);
    } else if (match.detail.input.method === 'OPTIONS' && match.detail.output.status !== 204) {
      this.setResponseHeaders(match.detail, <Environment>{});
      Responses.Helper.setStatus(match.detail.output, 204);
    }
  }

  /**
   * Default constructor.
   * @param settings Application settings.
   */
  constructor(settings: Settings) {
    super({ separator: '/', variable: /^\{([a-zA-Z_0-9]+)\}$/ });
    this.settings = settings;
  }
}
