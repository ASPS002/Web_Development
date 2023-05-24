// alert("Hello");
document.querySelector("h1").innerHTML = "Good Bye!";
var button = document.getElementById("myButton");
button.addEventListener("click",function(){
   button.style.color = "red";
});

// console.log(document.body.querySelector("ul"));
// console.log(document.getElementsByClassName("list")[2]);
document.body.querySelector("ul").lastElementChild.innerHTML="Ujjwal Srivastava";
document.querySelectorAll("#list .item")[1].style.color="red";