/**
 * 全局加载配置
 * shim定义了配置依赖
 * paths定义了路径
 */
requirejs.config({
    baseUrl: "../js",
    "paths": {
        // requireJS plugins
        "text": "../external/requirejs/plugins/text",
        "json": "../external/requirejs/plugins/json",

        "jquery": "../external/jquery/jquery",
        "jquery-ui": "../external/jquery-ui",
        "jquery-plugins": "../external/jquery/plugins",

        //"jquerymobile": "../backbone-requirejs/js/jquery.mobile",
        "jquerymobile": "../external/jquery-mobile/jquery.mobile-1.4.5",
        "domes": "../backbone-requirejs/js"
    },
    "shim": {
        "jquery-plugins/jquery.hashchange": [ "jquery" ],
        "jquery-ui/jquery.ui.widget": [ "jquery" ],
        "jquery-ui/jquery.ui.tabs": [ "jquery-ui/jquery.ui.widget" ],
        "jquery-ui/jquery.ui.core": [ "jquery" ],
        "jquerymobile": {
            deps: ['jquery']
        }



    }
});

require( ["jquery", "jquerymobile" ],
    function (jquery) {
        $(document).bind("mobileinit", function () {
            $.mobile.autoInitializePage = true;
        });

        require(['jquerymobile'],function(jquerymobile){
            //$.mobile.initializePage();
        });
        $("#home").toolbar({} );
        // Instantiates a new Backbone.js Mobile Router
        console.log("start..");
        /**
         require(["domes/dialog"],function(dialog){
		console.log("domes/dialog start..");
	});**/
    });


