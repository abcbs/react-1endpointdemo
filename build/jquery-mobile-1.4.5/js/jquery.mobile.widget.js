//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Widget factory extentions for mobile.
//>>label: Widget Factory
//>>group: Core
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery",
	"./jquery.mobile.ns",
	"jquery-ui/jquery.ui.widget",
	"./jquery.mobile.data" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

var rcapitals = /[A-Z]/g,
	replaceFunction = function( c ) {
		return "-" + c.toLowerCase();
	};

$.extend( $.Widget.prototype, {
	_getCreateOptions: function() {//增加缺省属性定义
		var option, value,
			elem = this.element[ 0 ],
			options = {};

		//elem中没有缺省属性defaults
		if ( !$.mobile.getAttribute( elem, "defaults" ) ) {
			//
			for ( option in this.options ) {
				value = $.mobile.getAttribute( elem, option.replace( rcapitals, replaceFunction ) );

				if ( value != null ) {
					options[ option ] = value;
				}
			}
		}

		return options;
	}
});

//TODO: Remove in 1.5 for backcompat only
$.mobile.widget = $.Widget;

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
