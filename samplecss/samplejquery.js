+function(factory) {
    factory(window.jQuery, window, document);
 }
(function($, window, document) {
     // The $ is now locally scoped
     // Listen for the jQuery ready event on the document
      $(function ($, window, document) {
          //隐藏
          $("#hiddenId").click(function(){
              $("p").hide(1000,
                  function (){
                     console.log("hide start...")
                 }
              );
          });
          //显示
          $("#showId").click(function(){
              $("p").show(1000,
                  function (){
                      console.log("show start...")
                  }
              );
          });

          //显示被隐藏的元素，并隐藏已显示的元素
          $("#toggleId").click(function(){
              $("p").toggle(1000,
                  function (){
                      console.log("toggle start...")
                  }
              );
          });
          //淡出
          $("#fadeOut").click(function(){
              $("#div1").fadeOut();
              $("#div2").fadeOut("slow");
              $("#div3").fadeOut(3000);
          });

          //淡入
          $("#fadeIn").click(function(){
              $("#div1").fadeIn();
              $("#div2").fadeIn("slow");
              $("#div3").fadeIn(3000);
          });

          //切入与切出转换
          $("#fadeToggle").click(function(){
              $("#div1").fadeToggle();
              $("#div2").fadeToggle("slow");
              $("#div3").fadeToggle(3000);
          });
          //透明度
          $("#fadeTo").click(function(){
              $("#div1").fadeTo("slow",0.15);
              $("#div2").fadeTo("slow",0.4);
              $("#div3").fadeTo("slow",0.7);
          });

          //
          $("#flip").click(function(){
              $("#panel").slideDown();
          });
          //
          $("#slideUp").click(function(){
              $("#panel").slideUp();
          });
          
          //
          $("#slideToggle").click(function(){
              $("#panel").slideToggle();
          });

          //
          $("#animateId").click(function(){
              $("#animateP").animate({left:'250px'});
          });
           //animateMultId
          $("#animateMultId").click(function(){
              $("#animateP").animate({
                  left:'250px',
                  opacity:'0.5',
                  height:'150px',
                  width:'150px'
              });
          });

          $("#div0").click(function(){
              $("#div0").append("添加的内容");
          });
          $("#triggerIds").click(function(){
              $("#div0").trigger("click");
          });

          //
          $('#footrigger').bind('click', function()
          {
              alert($(this).text());
              //激活绑定的事件
              $('#foo').trigger('custom', ["Trigger", $(this).text()]);
          });

          $('#foo').bind('custom', function(event, param1, param2)
          {
              //alert(param1 + "\n" + param2);
              $("#foo").text(param2);
          });

          //
        }
       )


   }
);
