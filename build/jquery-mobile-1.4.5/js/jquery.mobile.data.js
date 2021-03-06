//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Mobile versions of Data functions to allow for namespaceing
//>>label: jqmData
//>>group: Core
//>>css.structure: ../css/structure/jquery.mobile.core.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css
//L1291
define( [ "jquery", "./jquery.mobile.ns" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {
	var nsNormalizeDict = {},
		oldFind = $.find,
		rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, //\s\S 任何空白字符 任何非空白字符
	    //以jqmData的任何字符，jqmData(),但是不包括)
		//data-role="header"
		//:jqmData(role='none'), :jqmData(role='nojs')
		//data-role="footer" data-position="fixed" data-id="footernav"
		//在:jqmData()的括号之内，([^)]*不是以[开头
		jqmDataRE = /:jqmData\(([^)]*)\)/g;//^表示匹配开头()  ([^)]*) 匹配0个或者多个非)开头的字符
											//[^...]表示不在中括号[]之中的字符

	$.extend( $.mobile, {

		// Namespace used framework-wide for data-attrs. Default is no namespace

		ns: "",

		// Retrieve an attribute from an element and perform some massaging of the value

		getAttribute: function( element, key ) {
			var data;

			element = element.jquery ? element[0] : element;

			if ( element && element.getAttribute ) {
				data = element.getAttribute( "data-" + $.mobile.ns + key );
			}

			// Copied from core's src/data.js:dataAttr()
			// Convert from a string to a proper data type
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? JSON.parse( data ) :
					data;
			} catch( err ) {}

			return data;
		},

		// Expose our cache for testing purposes.
		nsNormalizeDict: nsNormalizeDict,

		// Take a data attribute property, prepend the namespace
		// and then camel case the attribute string. Add the result
		// to our nsNormalizeDict so we don't have to do this again.
		nsNormalize: function( prop ) {
			return nsNormalizeDict[ prop ] ||
				( nsNormalizeDict[ prop ] = $.camelCase( $.mobile.ns + prop ) );
		},

		// Find the closest javascript page element to gather settings data jsperf test
		// http://jsperf.com/single-complex-selector-vs-many-complex-selectors/edit
		// possibly naive, but it shows that the parsing overhead for *just* the page selector vs
		// the page and dialog selector is negligable. This could probably be speed up by
		// doing a similar parent node traversal to the one found in the inherited theme code above
		closestPageData: function( $target ) {
			return $target
				.closest( ":jqmData(role='page'), :jqmData(role='dialog')" )
				.data( "mobile-page" );
		}

	});

	// Mobile version of data and removeData and hasData methods
	// ensures all data is set and retrieved using jQuery Mobile's data namespace
	$.fn.jqmData = function( prop, value ) {
		var result;
		if ( typeof prop !== "undefined" ) {
			if ( prop ) {
				prop = $.mobile.nsNormalize( prop );
			}

			// undefined is permitted as an explicit input for the second param
			// in this case it returns the value and does not set it to undefined
			if ( arguments.length < 2 || value === undefined ) {
				result = this.data( prop );
			} else {
				result = this.data( prop, value );
			}
		}
		return result;
	};

	$.jqmData = function( elem, prop, value ) {
		var result;
		if ( typeof prop !== "undefined" ) {
			result = $.data( elem, prop ? $.mobile.nsNormalize( prop ) : prop, value );
		}
		return result;
	};

	$.fn.jqmRemoveData = function( prop ) {
		return this.removeData( $.mobile.nsNormalize( prop ) );
	};

	$.jqmRemoveData = function( elem, prop ) {
		return $.removeData( elem, $.mobile.nsNormalize( prop ) );
	};
	//JQuery find LiuJQ
	$.find = function( selector, context, ret, extra ) {
		if ( selector.indexOf( ":jqmData" ) > -1 ) {
			//HTML:<div data-role="page" id="home">
			// 正则表达式:/:jqmData\(([^)]*)\)/g; 在:jqmData()的括号之内，([^)]*不是以[开头
			// $1...$9 如果它(们)存在，是匹配到的子串
			//init.js: $pages = $( ":jqmData(role='page'), :jqmData(role='dialog')" ),
			//执行selector = selector.replace( jqmDataRE, selectorSource);之后的selector
			//                     "[data-role='page'], [data-role='dialog']"
			var selectorSource="[data-" + ( $.mobile.ns || "" ) + "$1]";
			selector = selector.replace( jqmDataRE, selectorSource);
		}

		return oldFind.call( this, selector, context, ret, extra );
	};

	$.extend( $.find, oldFind );

})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
