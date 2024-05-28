const character = document.querySelector(".character");
let charXPos = 45;
let charYPos = 85;
character.style.left = String(charXPos) + "%";
character.style.top = String(charYPos) + "%";

const platforms = document.querySelectorAll(".platform");
for (let platform of platforms) {
  platform.style.left = String(Math.floor(Math.random() * 67)) + "%";
  console.log(platform.style.left);
}

let score = 0;

// let charPos = [charXPos, charYPos]; //["45%,"95%"]

// const platform = document.querySelector(".platform");
// let platXPos = "20%";
// let platYPos = "70%";
// platform.style.left = platXPos;
// platform.style.top = platYPos;
// platform.style.width = "20%";
// let platPos = [platXPos, platYPos]; //["20%","70%"]

// class Createplatform {
//   constructor(platNum, platXPos, platYPos) {
//     this.platNum = platNum;
//     this.platXPos = platXPos;
//     this.platYPos = platYPos;
//   }
// }

document.addEventListener("keydown", (e) => {
  if (e.key == " ") {
    isJump();
  } else if (e.key === "ArrowRight") {
    moveRight();
  } else if (e.key === "ArrowLeft") {
    moveLeft();
  }
});

function isJump() {
  console.log(charYPos);
  charYPos = charYPos - 27.5;
  console.log((character.style.top = String(charYPos) + "%"));
  // character.style.transform = "translateY(-250px)";
  // setTimeout(() => {
  //   character.style.transform = "translateY(0px)";
  // }, 150);
  //   character.classList.add("isJumping");
  //   setTimeout(() => character.classList.remove("isJumping"), 500);
}
console.log((character.style.top = String(charYPos) + "%"));

// setInterval((landed) => {
//   let charYMaxPos =
//     String(
//       parseInt(window.getComputedStyle(character).getPropertyValue("top")) / 10
//     ) + "%";
//   if (
//     charYMaxPos === platYPos &&
//     parseInt(charXPos) >= parseInt(platXPos) &&
//     parseInt(charXPos) <= parseInt(platXPos) + parseInt(platform.style.width)
//   ) {
//     return true;
//   } else false;
// }, 1000);

function moveRight() {
  let newCharXPos = charXPos + 20;
  charXPos = newCharXPos;
  character.style.left = String(charXPos) + "%";
}

function moveLeft() {
  let newCharXPos = charXPos - 20;
  charXPos = newCharXPos;
  character.style.left = String(charXPos) + "%";
}
