//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Formats groups of links as horizontal navigation bars.
//>>label: Navbars
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.navbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "../jquery.mobile.grid" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.navbar", {
	/**
	 * mobile.navbar的base为
	 * options
	 * _create
	 *
	 */
	options: {
		iconpos: "top",
		grid: null
	},

	_create: function() {

		var $navbar = this.element,
			$navbtns = $navbar.find( "a, button" ),//查找a和button
			iconpos = $navbtns.filter( ":jqmData(icon)" ).length ? this.options.iconpos : undefined;

		$navbar.addClass( "ui-navbar" )/*添加类ui-navbar*/
			.attr( "role", "navigation" )/**设置role的的值为navigation*/
			.find( "ul" )//找到其中的ul
			.jqmEnhanceable()
			.grid({ grid: this.options.grid });

		$navbtns
			.each( function() {//遍历按钮或者a元素
				var icon = $.mobile.getAttribute( this, "icon" ),//获取鼠标
					theme = $.mobile.getAttribute( this, "theme" ),//或获取主题
					classes = "ui-btn";//类设置

				if ( theme ) {//类加上主题
					classes += " ui-btn-" + theme;
				}
				if ( icon ) {//如果有图标，获取图标，及其位置属性
					classes += " ui-icon-" + icon + " ui-btn-icon-" + iconpos;
				}
				$( this ).addClass( classes );//
			});

		$navbar.delegate( "a", "vclick", function( /* event */ ) {
			var activeBtn = $( this );

			if ( !( activeBtn.hasClass( "ui-state-disabled" ) ||

				// DEPRECATED as of 1.4.0 - remove after 1.4.0 release
				// only ui-state-disabled should be present thereafter
				activeBtn.hasClass( "ui-disabled" ) ||
				activeBtn.hasClass( $.mobile.activeBtnClass ) ) ) {

				$navbtns.removeClass( $.mobile.activeBtnClass );
				activeBtn.addClass( $.mobile.activeBtnClass );

				// The code below is a workaround to fix #1181
				$( document ).one( "pagehide", function() {
					activeBtn.removeClass( $.mobile.activeBtnClass );
				});
			}
		});

		// Buttons in the navbar with ui-state-persist class should regain their active state before page show
		$navbar.closest( ".ui-page" ).bind( "pagebeforeshow", function() {
			$navbtns.filter( ".ui-state-persist" ).addClass( $.mobile.activeBtnClass );
		});
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
