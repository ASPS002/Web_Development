$("h1").css("color","blue");

$("button");// selects all button instead of one

console.log($("h1").css("color"));

$("h1").addClass("bigTitle");

$("h1").addClass("bigTitle margin50");

$("h1").text("Bye");

$("button").html("<em>Hey</em>");

$("a").attr("href","https://www.yahoo.com");

$("h1").click(function(){

    $("h1").css("color","purple");
    ;
})

$("button").click(function(){

    // $("h1").css("color","purple");
    // $("h1").hide()
    // $("h1").show();
    // $("h1").toggle();
    // $("h1").fadeOut();
    // $("h1").fadeIn();
    // $("h1").slideUp();
    // $("h1").slideDown();
    // $("h1").slideToggle();

    // $("h1").animate({opacity:0.5});//custom animation
    $("h1").slideUp().slideDown().animate({opacity:0.5});
})

$("input").keydown(function(event){

    console.log(event.key);
})

$("h1").on("mouseover",function(){

    $("h1").css("color","green");
})