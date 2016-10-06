+function(factory) {
    factory(window.jQuery, window, document);
}
(function($, window, document) {
        // The $ is now locally scoped
        // Listen for the jQuery ready event on the document
        $(function ($, window, document) {
                //
                //为div中的所有p元素绑定click事件处理程序
                // 只有n2、n3可以触发该事件
                $("div").on("click", "p", function(){
                    // 这里的this指向触发点击事件的p元素(Element)
                    console.log( $(this).text() );
                });

                //为所有p元素绑定click事件处理程序(注意：这里省略了selector参数)
                //n2、n3、n5均可触发该事件
                $("p").on("click", function(event){
                    // 这里的this指向触发点击事件的p元素(Element)
                    console.log( $(this).text() );
                });



                //
            }//自动运行函数
        )


    }
);
