/*!
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Backend from '../../source';

/**
 * Files server, example class.
 */
@Class.Describe()
class Example extends Backend.Main {
  constructor() {
    super({
      httpStrictTransportSecurity: {
        maxAge: 3600,
        includeSubDomains: true,
        preload: true
      },
      contentSecurityPolice: {
        polices: [{ name: 'default-src', value: "'self'" }, { name: 'child-src', value: "'self'" }]
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
    this.addHandler(Backend.Handlers.File.Default, {
      strictTypes: true,
      baseDirectory: './examples/files/public',
      indexFile: 'index.html',
      types: {
        html: 'text/html',
        css: 'text/css',
        js: 'application/javascript',
        jpg: 'image/jpeg',
        png: 'image/png'
      }
    });

    // Automatic start.
    this.start();
  }
}

// Start application.
new Example();
