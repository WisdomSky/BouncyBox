$(function(){
    $("#bouncyBox").bouncyBoxRegister();


    $("#bounce").click(function(){
        
        $("#bouncyBox").html("This is a Bouncy Box example!");
        
        $("#bouncyBox").bouncyBox(500,function(){
            $(this).html("Click this box to dismiss...");
        });
    });


    $("#bouncyBox").click(function(){

        $(this).bouncyBoxDismiss(1000);
        
    });
    
});
