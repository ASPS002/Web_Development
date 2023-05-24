var randomDiceNumber = Math.random();
randomDiceNumber = Math.floor(randomDiceNumber*6);
randomDiceNumber+=1;

var diceName = "dice"+randomDiceNumber+".png";
var urlName = "C:\\Users\\hp\\Desktop\\Web_Development\\Dicee Challenge - Starting Files\\images\\"+diceName;


document.querySelector("img.img1").setAttribute("src",urlName);

var randomDiceNumber2 = Math.random();
randomDiceNumber2 = Math.floor(randomDiceNumber2*6);
randomDiceNumber2+=1;

var diceName2 = "dice"+randomDiceNumber2+".png";
var urlName2  = "C:\\Users\\hp\\Desktop\\Web_Development\\Dicee Challenge - Starting Files\\images\\"+diceName2;

document.querySelector("img.img2").setAttribute("src",urlName2);

if (randomDiceNumber>randomDiceNumber2) {

    document.querySelector("h1").innerText = "Player 1 Wins Yayy";
}
else if (randomDiceNumber<randomDiceNumber2) {

    document.querySelector("h1").innerText = "Player 2 Wins Yayy";
}
else {

    document.querySelector("h1").innerText = "It's a draw, Play again!";
}