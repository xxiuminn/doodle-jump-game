// definining initial state of screen
document.querySelector(".screen").style.width = "360px";
const screenWidth = parseInt(document.querySelector(".screen").style.width);
document.querySelector(".screen").style.height = "720px";
const screenHeight = parseInt(document.querySelector(".screen").style.height);

//score
let score = 0;
let scoreNum = document.createElement("p");
scoreNum.classList.add("score");
document.querySelector(".screen").appendChild(scoreNum);

function displayScore() {
  document.querySelector(".score").style.display = "block";
  scoreNum.innerText = String(score);
}

function stopScore() {
  document.querySelector(".score").style.display = "none";
}

function gameOverMsg() {
  //div to hold text & buttons
  let gameover = document.createElement("div");
  gameover.classList.add("gameover");
  gameover.innerHTML = "<h1>It's Over.</h1>";
  document.querySelector("body").appendChild(gameover);

  //div to hold buttons
  let gameoverButtons = document.createElement("div");
  gameoverButtons.classList.add("gameover-buttons");
  document.querySelector(".gameover").appendChild(gameoverButtons);

  //restart button
  let restart = document.createElement("button");
  restart.classList.add("restart");
  restart.innerText = "Play again";
  document.querySelector(".gameover-buttons").appendChild(restart);

  //cancel button
  let cancel = document.createElement("button");
  cancel.classList.add("cancel");
  cancel.innerText = "Cancel";
  document.querySelector(".gameover-buttons").appendChild(cancel);
}

function deadFromJumping() {
  if (
    character.classList.contains("isDeadFromJumping") ||
    character.classList.contains("isDeadFromWalking")
  ) {
    return;
  } else {
    character.classList.add("isDeadFromJumping");
    setTimeout(() => (character.style.top = String(screenHeight) + "px"), 400);
    setTimeout(() => character.remove(), 400);
    gameOverMsg();
  }
}

function deadFromWalking() {
  if (
    character.classList.contains("isDeadFromWalking") ||
    character.classList.contains("isDeadFromJumping")
  ) {
    return;
  } else {
    character.classList.add("isDeadFromWalking");
    setTimeout(() => (character.style.top = String(screenHeight) + "px"), 200);
    setTimeout(() => character.remove(), 200);
    gameOverMsg();
  }
}

//creating platforms
let numOfPlat = 7;
let platformArr = [];
for (let i = 0; i < numOfPlat; i++) {
  const platform = document.createElement("div");
  document.querySelector(".platformcontainer").appendChild(platform);
  platform.classList.add("platform");
  platform.style.top =
    String((screenHeight / (numOfPlat + 1)) * (i + 1)) + "px";
  platform.style.left = String(Math.random() * (screenWidth - 120)) + "px";
  platformArr.push(platform);
}

//creating character
const character = document.querySelector(".character");
character.style.top = String(parseInt(platformArr[6].style.top) - 82) + "px";
character.style.left = String(parseInt(platformArr[6].style.left) + 14) + "px";
let charLeft = parseInt(character.style.left);
let charTop = parseInt(character.style.top);

//jumps
function isJump() {
  if (character.classList.contains("isJumping")) {
    return;
  } else {
    character.classList.add("isJumping");
    // charTop = charTop + (screenHeight - screenHeight / (numOfPlat + 1));
    charTop -= screenHeight / (numOfPlat + 1);
    character.style.top = String(charTop) + "px";
    setTimeout(drop, 600);
    setTimeout(() => character.classList.remove("isJumping"), 600);
  }
}

//character & platforms readjust positions
function drop() {
  score += 1;
  displayScore();
  setTimeout(stopScore, 500);
  if (landed() === true) {
    if (
      parseInt(character.style.top) <
      parseInt(platformArr[6].style.top) - 82
    ) {
      charTop = (screenHeight / (numOfPlat + 1)) * 7 - 82;
      character.style.top = String(charTop) + "px";
      for (let i = 0; i < numOfPlat; i++) {
        let platTop =
          parseInt(platformArr[i].style.top) + screenHeight / (numOfPlat + 1);
        platformArr[i].style.top = String(platTop) + "px";
      }
      removePlat();
      addPlat();
    }
  } else {
    deadFromJumping();
  }
}

// //add platforms
function addPlat() {
  const platform = document.createElement("div");
  document.querySelector(".platformcontainer").prepend(platform);
  platform.classList.add("platform");
  platform.style.top = String(screenHeight / (numOfPlat + 1)) + "px";
  platform.style.left = String(Math.random() * (screenWidth - 120)) + "px";
  platformArr.splice(0, 0, platform);
}

//remove platforms
function removePlat() {
  platformArr.pop();
  let platform = document.querySelector(".platformcontainer");
  platform.removeChild(platform.lastElementChild);
}

//check if character landed on the next platform
function landed() {
  if (
    parseInt(character.style.left) > parseInt(platformArr[5].style.left) - 92 &&
    parseInt(character.style.left) < parseInt(platformArr[5].style.left) + 120
  ) {
    return true;
  } else {
    return false;
  }
}

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
  if (
    charLeft < parseInt(platformArr[6].style.left) - 120 ||
    charLeft > parseInt(platformArr[6].style.left) + 120
  ) {
    deadFromWalking();
  }
}
function moveLeft() {
  charLeft -= 100;
  character.style.left = String(charLeft) + "px";
  if (
    charLeft < parseInt(platformArr[6].style.left) - 120 ||
    charLeft > parseInt(platformArr[6].style.left) + 120
  ) {
    deadFromWalking();
  }
}

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
