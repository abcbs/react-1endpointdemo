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

		"jquerymobile": "../backbone-requirejs/js/jquery.mobile",
		//"jquerymobile": "jquery.mobile",
		"domes": "../backbone-requirejs/js"
	},
	"shim": {
		"jquery-plugins/jquery.hashchange": [ "jquery" ],
		"jquery-ui/jquery.ui.widget": [ "jquery" ],
		"jquery-ui/jquery.ui.tabs": [ "jquery-ui/jquery.ui.widget" ],
		"jquery-ui/jquery.ui.core": [ "jquery" ],


	}
});

require( ["jquery", "jquerymobile" ],
	function (jquery,jquerymobile) {

	console.log("start..");

		require( [ "domes/navpages" ], function ( vavpages) {
			// Instantiates a new Backbone.js Mobile Router
			console.log("vavpages start...");
			// $.mobile.initializePage();


		});

		$.widget( "custom.navbar",$.mobile.navbar, {

		});

		
});


