// Sets the require.js configuration for your application.
require.config( {
    //配置目录，从demo指向js目录，这里demo/js/external位于同级目录
    //paths中所有的文件的基准路径
    baseUrl: "../../js",

    "paths": {
        // requireJS plugins
        "text": "../external/requirejs/plugins/text",
        "json": "../external/requirejs/plugins/json",
        //"jquery-ui": "../external/jquery-ui",
        //"jquery-plugins": "../external/jquery/plugins",

        "jquery": "../external/jquery/jquery",
       // "jquery.mobile": "jquery.mobile",
        "jquery.mobile.1.4.5":"../external/jquery-mobile/jquery.mobile-1.4.5",
        "demo":"../demos/backbone-requirejs/js"

    },
    "shim": {
        "jquery": { exports: 'jQuery' },
       // "jquery-plugins/jquery.hashchange": [ "jquery" ],
        //"jquery-ui/jquery.ui.widget": [ "jquery" ],
        //"jquery-ui/jquery.ui.tabs": [ "jquery-ui/jquery.ui.widget" ],
        //"jquery-ui/jquery.ui.core": [ "jquery" ]

    }

});

// Includes File Dependencies
require([
    "jquery"
], function ( $) {
    //init事件处理
    $( document ).on( "mobileinit",

        // Set up the "mobileinit" handler before requiring jQuery Mobile's module
        function () {
            // Prevents all anchor click handling including the addition of active button state and alternate link bluring.
            $.mobile.linkBindingEnabled = false;
            // Disabling this will prevent jQuery Mobile from handling hash changes
            $.mobile.hashListeningEnabled = false;

        }

    )//事件绑定

    /**
    require( [ "demo/button" ], function ( button) {
        // Instantiates a new Backbone.js Mobile Router
        console.log("button start...");
       // $.mobile.initializePage();


       // $.mobile.changePage('index1.html');

    });**/
});
