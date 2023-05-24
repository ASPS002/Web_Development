
var totolNoOfDrums = document.querySelectorAll("button.drum").length;
// for(var i=0;i<totolNoOfDrums;i++){

//     document.querySelectorAll(".drum")[i].addEventListener("click",function(){

//         alert(i+" button got clicked");//always 7
//     });
// }
// The issue you're facing is related to the scoping of variables in JavaScript. The i variable used in the event listener function does
//  not retain its value from the loop iteration. As a result, when the event listener is triggered, the value of i is always the final value 
//  it had in the loop.

function getAudio(buttonName){
  
    switch (buttonName) {
        case "w":
            var audio = new Audio("sounds\\crash.mp3");
            audio.play();
            break;
        case "a":
            var audio = new Audio("sounds\\kick-bass.mp3");
            audio.play();
            break;
        case "s":
            var audio = new Audio("sounds\\snare.mp3");
            audio.play();
            break;
        case "d":
            var audio = new Audio("sounds\\tom-1.mp3");
            audio.play();
            break;
        case "j":
            var audio = new Audio("sounds\\tom-2.mp3");
            audio.play();
            break;
        case "k":
            var audio = new Audio("sounds\\tom-3.mp3");
            audio.play();
            break;
        case "l":
            var audio = new Audio("sounds\\tom-4.mp3");
            audio.play();
            break;
        default:
            alert(buttonName+ " is not a valid drum name");
            break;
    }

}

function buttonAnimation(buttonName){
  
    var activeButton = document.querySelector("." + buttonName);
    
    activeButton.classList.add("pressed");
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    },100);

}

for (var i = 0; i < totolNoOfDrums; i++) {

    (function (index) {
        document.querySelectorAll(".drum")[index].addEventListener("click", function () {

            // alert(index+" button got clicked");//correct value
            // var audio = new Audio("C:\Users\hp\Desktop\Web_Development\Drum Kit Starting Files\sounds\crash.mp3");
            // audio.play();
            // var audio = new Audio("sounds\\crash.mp3");
            // audio.play();
            // console.log(this); 
            var buttonInnerHtml = this.innerHTML;
            getAudio(buttonInnerHtml);
            buttonAnimation(buttonInnerHtml);
            //logs the particular button <button class="a drum">a</button>


            //         In the first path C:\Users\hp\Desktop\Web_Development\Drum Kit Starting Files\sounds\crash.mp3, 
            // the backslashes before the characters "U", "D", "W", "D", "s", and "c" are interpreted as escape 
            // characters. However, these characters do not have any special meaning after a backslash, so they are treated 
            // as literal characters. As a result, the path may not be correctly recognized or may cause errors.

            // To overcome this, you can use double backslashes to represent a literal backslash character. 
            // In the second path C:\\Users\\hp\\Desktop\\Web_Development\\Drum Kit Starting Files\\sounds\\crash.mp3,
            //  the double backslashes are interpreted as escape characters followed by a literal backslash. This way, the path is 
            // correctly recognized and can be used without any issues.

            // Alternatively, you can use forward slashes ("/") instead of backslashes ("") in file paths, 
            // as it is the standard path separator in web development and is supported on multiple platforms. 
            // For example: C:/Users/hp/Desktop/Web_Development/Drum Kit Starting Files/sounds/crash.mp3.

        });

    })(i);

    // In this updated code, an immediately-invoked function expression (IIFE) is used to create a new scope for each iteration 
    // of the loop. The index parameter in the IIFE captures the value of i for that particular iteration, creating a separate 
    // copy for each event listener function. This ensures that the correct value of i is used when the event listener is triggered.
    // With this modification, each button will display the correct index value when clicked, instead of always showing 7.

}

document.addEventListener("keydown",function(event){

    getAudio(event.key);
    buttonAnimation(event.key);
});
// When an escape character is encountered in a string or character literal, it is used to modify the interpretation
// of the following character or characters. For example, if you want to include a double quote within a string literal,
// you would use \" to escape the double quote and indicate that it should be treated as a literal character instead of the end of the string.

// Here's an example in JavaScript:

// javascript
// var message = "This is a \"quoted\" message.";
// console.log(message); // Output: This is a "quoted" message.

//In the above \ acts as a backslash character thus not considered as literal character that is why \\ is used in which second one is treated as literal character