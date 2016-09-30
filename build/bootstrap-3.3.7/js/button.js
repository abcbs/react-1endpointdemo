/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================
  // 类定义
  var Button = function (element, options) {
    this.$element  = $(element);//获取元素
    //定义属性options
    this.options   = $.extend({}, Button.DEFAULTS, options);
    this.isLoading = false;//装载中
  };

  Button.VERSION  = '3.3.7';

  Button.DEFAULTS = {
    loadingText: 'loading...'
  };
  //Button的实例方法设置状态setState
  Button.prototype.setState = function (state) {
    var d    = 'disabled';//是否可用
    var $el  = this.$element;//元素
    //1.	text()-设置或返回所选元素的文本内容
    //2.	html()-设置或返回所选元素的内容
    //3.	val()-设置或返回表单字段的值
    var val  = $el.is('input') ? 'val' : 'html';//是input则使用val方法，否则使用html函数
    //存储与匹配元素相关的任意数据。
    var data = $el.data();

    state += 'Text';
    //
    if (data.resetText == null) {
      $el.data('resetText', $el[val]())
    }

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state]);

      if (state == 'loadingText') {
        this.isLoading = true;
        $el.addClass(d).attr(d, d).prop(d, true);
      } else if (this.isLoading) {
        this.isLoading = false;
        $el.removeClass(d).removeAttr(d).prop(d, false);
      }
    }, this), 0);
  };

  //toggle
  //toggle() 方法用于绑定两个或多个事件处理器函数，以响应被选元素的轮流的 click 事件。
  //该方法也可用于切换被选元素的 hide() 与 show() 方法。
  Button.prototype.toggle = function () {
    var changed = true;
    //元素上级有类为data-toggle属性为buttons元素
    var $parent = this.$element.closest('[data-toggle="buttons"]');

    if ($parent.length) {//元素上级有类为data-toggle属性为buttons元素
      //获得当前匹配元素集合中每个元素的后代，由选择器进行筛选。
      var $input = this.$element.find('input');
      if ($input.prop('type') == 'radio') {//当前元素时radio
        if ($input.prop('checked')) {//已经选择
          changed = false;
        }
        //父元素中所有类为.active删除类active
        $parent.find('.active').removeClass('active');
        this.$element.addClass('active');//当前元素为激活
      } else if ($input.prop('type') == 'checkbox') {//如果是checkbox
        if (($input.prop('checked')) !== this.$element.hasClass('active')) {
          changed = false;
        }
        this.$element.toggleClass('active');
      }//不是上面两者，设置是否选中
      $input.prop('checked', this.$element.hasClass('active'));
      if (changed) {
        $input.trigger('change');
      }
    } else {//如果父元素没有button
      //设置aria-pressed
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'));
      //切换到active
      this.$element.toggleClass('active');
    }
  };


  // BUTTON PLUGIN DEFINITION
  // ========================
  /**
   *  $("li").each(function(){
      alert($(this).text())
    });
   * @param option
   * @returns {*}
   * @constructor
     */
  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this);//遍历中的当前元素
      //利用jQuery的.data(key, value)存储Button对象
      //获取存储的Button对象，如果是第一次执行变量data的值为undefined
      var data    = $this.data('bs.button');
      var options = typeof option == 'object' && option;
      // 创建Button对象: new Button(this, options)
      //并赋值给变量data: data = new Button(this, options)
     // 存储在元素的jQuery对象上的‘bs.button’数据字段 $this.data('bs.button', data)
      if (!data) {
        $this.data('bs.button', (data = new Button(this, options)));
      }
      // data是一个Button对象，可以调用Button的原生方法
      if (option == 'toggle') {
        data.toggle();
      }
      else if (option) {
        data.setState(option)
      }
    });
  }

  var old = $.fn.button;
  // 插件定义
  $.fn.button             = Plugin;
  //类赋值到jQuery button对象的Constructor属性
  //这里的Constructor只是一个普通属性，我们也可以写成其他名字 $.fn.button.Something = Button，
  // Bootstrap为了指明这个属性的意义而命名为构造器“Constructor”更合理。
  //Bootstrap作用域外如何使用Button
  //其使用方法是：	var Button = $.fn.button.Constructor
  //$(".btn.danger").button("toggle").addClass("fat")
  $.fn.button.Constructor = Button;


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old;
    return this;
  };


  // BUTTON DATA-API
  // ===============
  //事件绑定
  //data-toggle^="button" 选择具有data-toggle属性且属性值为以button开头的字符串的E元素
  //click委托事件监听器绑定在document元素上，并给click事件赋予命名空间click.bs.button.data-api
  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      //closest获取第一个相匹配的祖先元素
      //e.target 是目标对象，e.event是目标所发生的事件。
      var $btn = $(e.target).closest('.btn');
      Plugin.call($btn, 'toggle');//在button对象上传入参数toggle.
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {//不是radio、checbox
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault();
        // The target component still receive the focus
        if ($btn.is('input,button')) {
          $btn.trigger('focus')//激活
        }
        else {
          $btn.find('input:visible,button:visible').first().trigger('focus')
        }
      }//!($(e.target).is if
    })
    //事件分组
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      //^focus(in)?$ Multiline 表达式 "^" 和 "$" 只匹配字符串的开始 ① 和结尾 ④ 位置
      //?修饰匹配次数为 0 次或 1 次。要匹配 "?" 字符本身，请使用 "/?"
      //test 返回 Boolean，查找对应的字符串中是否存在模式。
      //exec 查找并返回当前的匹配结果，并以数组的形式返回。
      // exec 方法受参数 g 的影响。若指定了 g，则下次调用 exec 时，会从上个匹配的 lastIndex 开始查找
      //match 是 String 对象的一个方法。
      //match 这个方法有点像 exec，但：exec 是 RegExp 对象的方法；math 是 String 对象的方法。
      // 二者还有一个不同点，就是对参数 g 的解释。
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type));
    })

}(jQuery);
