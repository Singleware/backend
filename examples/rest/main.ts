/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Backend from '../../source';

import { Handler } from './handler';

/**
 * JSON server, example class.
 */
@Class.Describe()
class Example extends Backend.Main {
  constructor() {
    super({
      crossOriginRequestSharing: {
        allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
        maxAge: 3600
      },
      contentSecurityPolicy: {
        polices: [
          { name: 'default-src', value: "'self'" },
          { name: 'child-src', value: "'self'" }
        ]
      }
    });

    // Add console logger.
    this.addLogger(new Backend.Loggers.Console());

    // Add HTTP service.
    this.addService(
      new Backend.Services.Server({
        debug: true,
        port: 8080
      })
    );

    // Add request handler.
    this.addHandler(Handler);

    // Automatic start.
    this.start();
  }
}

// Start application.
new Example();
