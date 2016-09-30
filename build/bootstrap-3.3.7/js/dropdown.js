/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop';
  var toggle   = '[data-toggle="dropdown"]';
  var Dropdown = function (element) {
    //增加事件
    $(element).on('click.bs.dropdown', this.toggle);
  };

  Dropdown.VERSION = '3.3.7';

  function getParent($this) {
    //获取属性为data-target的属性值
    //attr() 方法设置或返回被选元素的属性值。如#example-navbar-collapse
    var selector = $this.attr('data-target');
    //this.replace(/(^\s*)|(\s*$)/g, "");
    //空格开头或者空格结尾
    //^是开始
    //\s是空白
    //*表示0个或多个
    //|是或者
    //$是结尾
    //g表示全局
    if (!selector) {//不存在
      selector = $this.attr('href');//获取href
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    //获取父元素
    var $parent = selector && $(selector);
    //有选择器则作为父返回，否则返回本身的父
    //获得当前匹配元素集合中每个元素的父元素，由选择器筛选（可选）
    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) {
      return;
    }
    $(backdrop).remove();
    $(toggle).each(function () {//变量切换元素
      var $this         = $(this);
      var $parent       = getParent($this);
      var relatedTarget = { relatedTarget: this };

      if (!$parent.hasClass('open')) {
        //comment by liujq
        return;
      }

      if (e && e.type == 'click' &&
          /input|textarea/i.test(e.target.tagName)
          && $.contains($parent[0], e.target)) {
          return;
      }

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));

      if (e.isDefaultPrevented()) {
          return;
      }

      $this.attr('aria-expanded', 'false');
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget));
    });
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this);

    if ($this.is('.disabled, :disabled')) {
      return;
    }

    var $parent  = getParent($this);
    var isActive = $parent.hasClass('open');

    clearMenus();

    if (!isActive) {
      if ('ontouchstart' in document.documentElement &&
          !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus);
      }

      var relatedTarget = { relatedTarget: this };
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));

      if (e.isDefaultPrevented()) {
        return;
      }

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true');

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget));
    }

    return false;
  };

  //键盘事件up down esc space
  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) {
      return;
    }

    var $this = $(this);

    e.preventDefault();
    e.stopPropagation();
    //为disabled为disabled
    if ($this.is('.disabled, :disabled')) {
      return;//disabled是返回
    }

    var $parent  = getParent($this);//获取父元素
    var isActive = $parent.hasClass('open');
    //27-Escape
    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) {//
        $parent.find(toggle).trigger('focus');
      }
      return $this.trigger('click');//触发click
    }

    var desc = ' li:not(.disabled):visible a';
    var $items = $parent.find('.dropdown-menu' + desc);

    if (!$items.length) return;

    var index = $items.index(e.target);

    if (e.which == 38 && index > 0)                 index--;         // up
    if (e.which == 40 && index < $items.length - 1) index++ ;        // down
    if (!~index)                                    index = 0;

    $items.eq(index).trigger('focus');
  };


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data  = $this.data('bs.dropdown');//获取bs.dropdown数据Dropdown

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)));
      if (typeof option == 'string') {
        data[option].call($this);//调用此元素的方法
      }
    })
  }

  var old = $.fn.dropdown;

  $.fn.dropdown             = Plugin;
  $.fn.dropdown.Constructor = Dropdown;


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old;
    return this;
  };


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
      e.stopPropagation()
    })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
