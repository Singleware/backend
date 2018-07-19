"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Backend = require("../source");
// Creates an application.
const server = new Backend.Main({});
// Add the HTTP service.
server.addService(Backend.Services.Server, {
    port: 8080,
    debug: true
});
// Add the file handler.
server.addHandler(Backend.Handlers.File.Default, {
    strict: true,
    directory: './examples/public',
    index: 'index.html',
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
