define(["jquery","jquery.mobile.1.4.5"],function($,jquerymobile){
    console.log("button demos..")
    $( "#aId" ).button({
        corners: false,
        disabled: true,
        icon: "star"
    });
    var theme = $( "#aId" ).button( "option", "theme" );
    $( "#aId" ).button( "enable" );
    console.log(theme);

    $("#aId").on("click",function(){
        alert("You swiped right!");
    });

    $.widget( "custom.progressbar", {
        _create: function() {
            var progress = this.options.value + "%";
            this.element
                .addClass( "progressbar" )
                .text( progress );
        }
    });

    $( "<div></div>" )
        .appendTo( "#main" )
        .progressbar({ value: 20 });


});  
