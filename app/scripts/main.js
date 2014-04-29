require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        mustache: '../bower_components/mustache/mustache'
    },
    shim: {
        'jquery': {
            exports: '$'
        }
    }
});

require(['app'], function (app) {
    'use strict';
    // use app here

    app.init();
});