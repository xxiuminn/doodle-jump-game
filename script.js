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
  if (keys.right === true && keys.jump === true && keys.left === false) {
    character.classList.add("isDeadFromJumping");
    setTimeout(() => (character.style.top = String(screenHeight) + "px"), 400);
    setTimeout(() => character.remove(), 400);
    gameOverMsg();
  }
}

function deadFromWalking() {
  if (character.classList.contains("isDeadFromWalking")) {
    return;
  }
  console.log("dead");
  character.classList.add("isDeadFromWalking");
  setTimeout(() => (character.style.top = String(screenHeight) + "px"), 200);
  setTimeout(() => character.remove(), 200);
  gameOverMsg();
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

// adjust screen & character down when the character jumps.
function adjustScreen() {
  const drop = setInterval((gravity) => {
    if (
      charTop < (screenHeight / (numOfPlat + 1)) * 7 - 92 &&
      parseInt(platformArr[5].style.top) !==
        screenHeight - screenHeight / (numOfPlat + 1)
    ) {
      charTop += 1;
      character.style.top = String(charTop) + "px";
      for (let i = 0; i < numOfPlat; i++) {
        let platTop = parseInt(platformArr[i].style.top);
        platTop += 1;
        platformArr[i].style.top = String(platTop) + "px";
      }
    } else {
      clearInterval(drop);
      removePlat();
      addPlat();
      landed();
      console.log("screen adjusted");
    }
  }, 1);
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
    parseInt(character.style.left) > parseInt(platformArr[6].style.left) - 92 &&
    parseInt(character.style.left) < parseInt(platformArr[6].style.left) + 120
  ) {
    // score += 1;
    // displayScore();
    // setTimeout(stopScore, 500);
    console.log("land");
    return true;
  } else {
    console.log("dead");
    deadFromWalking();
  }
}

let keys = { right: false, left: false, jump: false };

document.addEventListener("keydown", (event) => {
  console.log("Event keydown");
  switch (event.key) {
    case "ArrowRight":
      keys.right = true;
      break;
    case "ArrowLeft":
      keys.left = true;
      break;
    case " ":
      keys.jump = true;
      break;
  }
  console.log(keys);
  if (keys.right === true && keys.jump === true && keys.left === false) {
    console.log("jump right");
    moveRight();
    isJump();
  } else if (keys.right === false && keys.jump === true && keys.left === true) {
    console.log("jump left");
    moveLeft();
    isJump();
  } else if (
    keys.right === false &&
    keys.jump === true &&
    keys.left === false
  ) {
    console.log("jump only");
    isJump();
  } else if (
    keys.right === false &&
    keys.jump === false &&
    keys.left === true
  ) {
    moveLeft();
  } else if (
    keys.right === true &&
    keys.jump === false &&
    keys.left === false
  ) {
    moveRight();
  }
});

let startLeft;
let startRight;
let keyLeftCount = 0;
let keyRightCount = 0;

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowRight":
      keys.right = false;
      clearInterval(startRight);
      keyRightCount = 0;
      break;
    case "ArrowLeft":
      keys.left = false;
      clearInterval(startLeft);
      keyLeftCount = 0;
      break;
    case " ":
      keys.jump = false;
      break;
  }
});

//keyboard controls

const moveLeft = () => {
  document.querySelector(".character").style.backgroundImage =
    "var(--doodle-left-image)";
  if (keyLeftCount > 0) {
    return;
  } else {
    startLeft = setInterval(() => {
      keyLeftCount += 1;
      charLeft -= 1;
      character.style.left = String(charLeft) + "px";
      landed();
      // if (landed === false) {
      //   deadFromWalking();
      // }
      // if (
      //   charLeft < parseInt(platformArr[6].style.left) - 120 ||
      //   charLeft > parseInt(platformArr[6].style.left) + 120
      // ) {
      //   console.log("die move left");
      //   deadFromWalking();
      // }
    });
  }
};

const moveRight = () => {
  document.querySelector(".character").style.backgroundImage =
    "var(--doodle-right-image)";
  if (keyRightCount > 0) {
    return;
  } else {
    startRight = setInterval(() => {
      keyRightCount += 1;
      charLeft += 1;
      character.style.left = String(charLeft) + "px";
      // if (landed === false) {
      //   deadFromWalking();
      // }
      // if (
      //   charLeft < parseInt(platformArr[6].style.left) - 120 ||
      //   charLeft > parseInt(platformArr[6].style.left) + 120
      // ) {
      //   console.log("die move right");
      //   deadFromWalking();
      // }
    });
    landed();
  }
};

//jumps
function isJump() {
  if (character.classList.contains("isJumping")) {
    return;
  } else {
    character.classList.add("isJumping");
    charTop -= screenHeight / (numOfPlat + 1);
    character.style.top = String(charTop) + "px";
    adjustScreen();
    setTimeout(() => character.classList.remove("isJumping"), 400);
    landed();
    // if (
    //   charLeft < parseInt(platformArr[5].style.left) - 120 ||
    //   charLeft > parseInt(platformArr[5].style.left) + 120
    // ) {
    //   console.log("die is jumps");
    //   deadFromWalking();
    // }
  }
}

const jumpLeft = () => {
  document.querySelector(".character").style.backgroundImage =
    "var(--doodle-left-image)";
  if (character.classList.contains("isJumping")) {
    return;
  } else {
    setInterval(() => {
      charLeft -= 1;
      character.style.left = String(charLeft) + "px";
    }, 1);
    character.classList.add("isJumping");
    charTop -= screenHeight / (numOfPlat + 1);
    character.style.top = String(charTop) + "px";
    adjustScreen();
    setTimeout(() => character.classList.remove("isJumping"), 400);
  }
  landed();
};

// const jumpRight = () => {
//   document.querySelector(".character").style.backgroundImage =
//     "var(--doodle-right-image)";
// if (character.classList.contains("isJumping")) {
//   console.log("hi");
//   return;
// } else {
// character.classList.add("isJumping");
// charTop -= screenHeight / (numOfPlat + 1);
// character.style.top = String(charTop) + "px";
// adjustScreen();
// setTimeout(() => character.classList.remove("isJumping"), 400);
// startRight = setInterval(() => {
//   keyRightCount += 1;
//   console.log("hi");
//   charLeft += 1;
//   character.style.left = String(charLeft) + "px";
// });
// };
// charLeft += 100;
// character.style.left = String(charLeft) + "px";
// };

// document.addEventListener("keydown", (e) => {
//   if (e.key == " ") {
//     isJump();
//   } else if (e.key === "ArrowRight") {
//     moveRight();
//     document.querySelector(".character").style.backgroundImage =
//       "var(--doodle-right-image)";
//   } else if (e.key === "ArrowLeft") {
//     moveLeft();
//     document.querySelector(".character").style.backgroundImage =
//       "var(--doodle-left-image)";
//   }
// });

// function moveRight() {
//   charLeft += 5;
//   character.style.left = String(charLeft) + "px";
//   if (
//     charLeft < parseInt(platformArr[6].style.left) - 120 ||
//     charLeft > parseInt(platformArr[6].style.left) + 120
//   ) {
//     deadFromWalking();
//   }
// }
// function moveLeft() {
//   charLeft -= 5;
//   character.style.left = String(charLeft) + "px";
//   if (
//     charLeft < parseInt(platformArr[6].style.left) - 120 ||
//     charLeft > parseInt(platformArr[6].style.left) + 120
//   ) {
//     deadFromWalking();
//   }
// }
