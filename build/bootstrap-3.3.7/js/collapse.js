/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element);
    this.options       = $.extend({}, Collapse.DEFAULTS, options);
    //折叠事件的触发者，href或者data-target为折叠的id的属性
    //如:
    //[data-toggle="collapse"][href="#example-navbar-collapse"],
    // [data-toggle="collapse"][data-target="#example-navbar-collapse"]"
    //html为
    //<button type="button" class="navbar-toggle" data-toggle="collapse"
    //        data-target="#example-navbar-collapse">
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]');
    this.transitioning = null;

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }
    //如果有toggle则执行toggle
    if (this.options.toggle) this.toggle()
  };
  //Collapse构造函数结束

  Collapse.VERSION  = '3.3.7';

  Collapse.TRANSITION_DURATION = 350;

  Collapse.DEFAULTS = {
    toggle: true
  };

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width');
    return hasWidth ? 'width' : 'height';
  };

  Collapse.prototype.show = function () {
    //正在过度，或者有in则返回
    if (this.transitioning || this.$element.hasClass('in')) return;

    var activesData;
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing');

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse');
      if (activesData && activesData.transitioning) return
    }
    //定义展现事件
    var startEvent = $.Event('show.bs.collapse');
    this.$element.trigger(startEvent);//在目标元素（折叠区域上）激活展现事件
    if (startEvent.isDefaultPrevented()) return;

    if (actives && actives.length) {
      Plugin.call(actives, 'hide');
      activesData || actives.data('bs.collapse', null)
    }
    //尺寸
    var dimension = this.dimension();
    //CSS中的设置
    //collapse中的display为none
    //collapsing为position: relative;
    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true);

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true);

    this.transitioning = 1;
    //删除折叠中collapsing样式，collapsing中的display设置值为none，即不显示
    //collapse in的display为block
    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('');
      this.transitioning = 0;
      //触发折叠事件
      this.$element
        .trigger('shown.bs.collapse');
    };
    //元素不支持动态时转移时
    if (!$.support.transition) return complete.call(this);

    var scrollSize = $.camelCase(['scroll', dimension].join('-'));
    //在代理中使用此值
    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  };
  //show over

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return;

    var startEvent = $.Event('hide.bs.collapse');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;

    var dimension = this.dimension();

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
    //增加CSS的类collapsing也就是none
    //collapse in的display为block
    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false);

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false);

    this.transitioning = 1;

    var complete = function () {
      this.transitioning = 0;
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse');
    };

    if (!$.support.transition) return complete.call(this);

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  };
  //hide over
  //执行的
  Collapse.prototype.toggle = function () {
    //如果class包含in，则执行this[hide]()，否则执行this[show]()
    this[this.$element.hasClass('in') ? 'hide' : 'show']();
  };

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element);
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  };

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in');
    //设置区域是否展开属性
    $element.attr('aria-expanded', isOpen);
    $trigger//触发元素上添加折叠状态
      .toggleClass('collapsed', !isOpen)//添加类collapsed
      .attr('aria-expanded', isOpen)//增加属性
  };

  /**
   *
   * @param $trigger 触发的元素
   * @returns {*|HTMLElement}
     */
  function getTargetFromTrigger($trigger) {
    var href;
    //如果含有data-target则直接返回其属性值，否则读取href的值
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7

    return $(target);//转变为JQuery格式元素
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      //变量的元素，即一个个折叠的元素
      var $this   = $(this);
      //收集所有data-*数据
      var data    = $this.data('bs.collapse');
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if (!data && options.toggle && /show|hide/.test(option)) {
        options.toggle = false;
      }
      //如果不存在，则实例化Collapse，并且缓存
      if (!data) {
        $this.data('bs.collapse', (data = new Collapse(this, options)));
      }
      if (typeof option == 'string'){
        data[option]();
      }
    })
  }

  var old = $.fn.collapse;
  //设置collapse插件
  $.fn.collapse             = Plugin;
  //插件构造函数
  $.fn.collapse.Constructor = Collapse;


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old;
    return this;
  };


  // COLLAPSE DATA-API
  // =================
  //在document上绑定点击事件click，其命名空间为.bs.collapse.data-api
  //在选择器[data-toggle="collapse"]
  //并执行Handler函数
  //function( types, selector, data, fn )
  $(document).on('click.bs.collapse.data-api',
    '[data-toggle="collapse"]', function (e) {
    //this指向触发点击事件的元素(Element)
    var $this   = $(this);
   //如果没有属性data-target的值则阻止事件冒泡
    if (!$this.attr('data-target')){
      e.preventDefault();
    }
    //获取目标元素，即data-target中指定的元素
    var $target = getTargetFromTrigger($this);
    //从缓存数据中获取折叠元素
    var data    = $target.data('bs.collapse');
    //$this.data()收集所有data-*数据
    //如果缓存数据存在则执行toggle，否则在本元素中执行data方法
    var option  = data ? 'toggle' : $this.data();
    //在目标元素调用Plugin，option为
     // toggle:"collapse"
    //target:"#example-navbar-collapse"
    //文档中绑定  
    Plugin.call($target, option);
  });//on

}(jQuery);
