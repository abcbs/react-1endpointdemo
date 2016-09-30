/**
 * 全局加载配置
 * shim定义了配置依赖
 * paths定义了路径
 */
requirejs.config({

	"paths": {
		// requireJS plugins
		"text": "../external/requirejs/plugins/text",
		"json": "../external/requirejs/plugins/json",

		"jquery": "../external/jquery/jquery",
		"jquery-ui": "../external/jquery-ui",
		"jquery-plugins": "../external/jquery/plugins"
	},
	"shim": {
		"jquery-plugins/jquery.hashchange": [ "jquery" ],
		"jquery-ui/jquery.ui.widget": [ "jquery" ],
		"jquery-ui/jquery.ui.tabs": [ "jquery-ui/jquery.ui.widget" ],
		"jquery-ui/jquery.ui.core": [ "jquery" ]
	}
});



