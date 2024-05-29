// definining initial state of screen
document.querySelector(".screen").style.width = "1280px";
const screenWidth = parseInt(document.querySelector(".screen").style.width);
document.querySelector(".screen").style.height = "720px";
const screenHeight = parseInt(document.querySelector(".screen").style.height);

//score
let score = 0;

//creating platforms
let numOfPlat = 7;
let platformArr = [];
for (let i = 0; i < numOfPlat; i++) {
  const platform = document.createElement("div");
  document.querySelector(".screen").appendChild(platform);
  platform.classList.add("platform");
  platform.style.top = String((100 / (numOfPlat + 1)) * (i + 1)) + "%";
  platform.style.left = String(Math.random() * (screenWidth - 120)) + "px";
  platformArr.push(platform);
}

//creating character
const character = document.querySelector(".character");
character.style.top =
  String((parseInt(platformArr[6].style.top) / 100) * screenHeight - 82) + "px";
character.style.left = String(parseInt(platformArr[6].style.left) + 14) + "px";
charLeft = parseInt(character.style.left);
charTop = parseInt(character.style.top);
console.log(charTop);

//jumps
function isJump() {
  character.classList.add("isJumping");
  character.style.top = "60%";
  // charTop = character.style.top;
  // if (checkCharXPos()) {
  //   land();
  // landed();
  // }
  setTimeout(() => character.classList.remove("isJumping"), 700);
}

// function landed() {
//   character.style.top = String((100 / (numOfPlat + 1)) * 6) + "%";
//   charTop = character.style.top;
// }

// function land() {
//   let platTop = parseInt(platformContainer.style.top);
//   platTop += 25;
//   console.log(platTop);
//   platformContainer.style.top = String(platTop) + "%";
// }

//keyboard controls
document.addEventListener("keydown", (e) => {
  if (e.key == " ") {
    isJump();
  } else if (e.key === "ArrowRight") {
    moveRight();
    document.querySelector(".character").style.backgroundImage =
      "var(--doodle-right-image)";
  } else if (e.key === "ArrowLeft") {
    moveLeft();
    document.querySelector(".character").style.backgroundImage =
      "var(--doodle-left-image)";
  }
});

function moveRight() {
  charLeft += 100;
  character.style.left = String(charLeft) + "px";
}
function moveLeft() {
  charLeft -= 100;
  character.style.left = String(charLeft) + "px";
}

// const platformContainer = document.querySelector(".platformcontainer");
// platformContainer.style.top = "0%";

// randomise order of the platforms
// const platforms = document.querySelectorAll(".platform");
// for (let platform of platforms) {
//   platform.style.left = String(Math.floor(Math.random() * 67)) + "%";
// }

//identifying the next platform character should be on.
// let nextPlatLeft = platforms[1].offsetLeft;

//check if character will land on next platform

// const checkCharXPos = () => {
//   console.log(parseInt(character.style.left));
//   console.log(nextPlatLeft / 10);
//   console.log(nextPlatLeft / 10 - 10);
//   console.log(nextPlatLeft / 10 + 33 + 10);
//   if (
//     parseInt(character.style.left) > nextPlatLeft / 10 - 10 &&
//     parseInt(character.style.left) < nextPlatLeft / 10 + 33
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// };

// add & remove platforms
// const addPlat = () => {
//   let div1 = document.createElement("div");
//   div1.classList.add("row");
//   document.querySelector(".platformcontainer").prepend(div1);

//   let div2 = document.createElement("div");
//   div2.classList.add("platform");
//   document.querySelector(".row").appendChild(div2);
// };

// const removePlat = () => {
//   document.querySelector;
// };

// class Createplatform {
//   constructor(platNum, platXPos, platYPos) {
//     this.platNum = platNum;
//     this.platXPos = platXPos;
//     this.platYPos = platYPos;
//   }
// }

// setInterval((checkCharXPos) => {
//   if (
//     parseInt(character.style.left) >= nextPlatLeft / 10 &&
//     parseInt(character.style.left) <= nextPlatLeft / 10 + 33
//   ) {
//     // console.log(true);
//     return true;
//   } else {
//     return false;
//     // console.log(false);
//   }
// }, 1000);

// const addPlat = () => {
//   let div1 = document.createElement("div");
//   div1.classList.add("row");
//   document.querySelector(".platformcontainer").prepend(div1);

//   let div2 = document.createElement("div");
//   div2.classList.add("platform");
//   document.querySelector(".row").appendChild(div2);
// };
