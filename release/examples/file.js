"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 *
 * The proposal of this example is to show how to use the backend package with a default file server.
 */
const Backend = require("../source");
// Creates an application.
const server = new Backend.Main({});
server.addLogger(Backend.Loggers.Console);
// Add the HTTP service.
server.addService(Backend.Services.Server, {
    port: 8080,
    debug: true
});
// Add the file handler.
server.addHandler(Backend.Handlers.File.Default, {
    strictTypes: true,
    baseDirectory: './examples/public',
    indexFile: 'index.html',
    types: {
        html: 'text/html',
        css: 'text/css',
        js: 'application/javascript',
        jpg: 'image/jpeg',
        png: 'image/png'
    }
});
// Starts the listening.
server.start();
