+function(factory) {
    factory(window.jQuery, window, document);
}
(function($, window, document) {
        // The $ is now locally scoped
        // Listen for the jQuery ready event on the document
        $(function ($, window, document) {

            console.log("正则表达式");
            var reg = /test(\d+)/;
            var str = 'new test001 test002';
            console.log(str.match(reg));
            // 代码中 (\d+)是一个分组（有些人也叫他子模式），但是表示的都是同一个意思，
            // 上面的例子中 test001是完全匹配的结果，然而 分组的匹配是从整个完全匹配结果(也就是test001)
            // 中来查找与子模式\d+匹配的字符,这里显然是 001.
            
            var reg = /test(\d)+/;
            var str = 'new test001 test002';
            console.log(str.match(reg));

            var Tree = function(element, options) {
                var $tree = this.$tree = $(element);
                //监听init事件，触发
                $tree.on('init.my.tree', $.proxy(options.onInit, this));
                this.init();
            };

            Tree.prototype.init = function() {
                console.log('tree init!');
                this.$tree.trigger('init.my.tree');
            };

            var tree = new Tree('#tree', {
                onInit: function() {
                    console.log(this.$tree.outerHeight());
                }
            });

            var Dragable = function(element, options) {
                var $element = this.$element = $(element);
                //监听init事件，触发
                $element.on('init.my.dragable', $.proxy(options.onInit, this));
                this.init();
            };

            Dragable.prototype.init = function() {
                console.log('drag init!');
                this.$element.trigger('init.my.dragable');
            };

            var drag = new Dragable('#tree', {
                onInit: function() {
                    console.log('start drag!');
                }
            });



            //
            }
        )


    }
);
