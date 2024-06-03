// definining initial state of screen
let adjustingScreen = false;
document.querySelector(".screen").style.width = "360px";
const screenWidth = parseInt(document.querySelector(".screen").style.width);
document.querySelector(".screen").style.height = "720px";
const screenHeight = parseInt(document.querySelector(".screen").style.height);

let haveLanded = false;
let alive = true;
let gameIsOver = false;
let keys = { right: false, left: false, jump: false };
let score = 0;
let scoreNum = document.createElement("p");
scoreNum.classList.add("score");
document.querySelector(".screen").appendChild(scoreNum);

//soundtrack
function jumpAudio() {
  let audio = new Audio("/assets/jump.mp3");
  audio.play();
}
document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    jumpAudio();
  }
});

function gameOverAudio() {
  let audio = new Audio("/assets/gameover.mp3");
  audio.play();
}

//start game screen
startGame();
function startGame() {
  //div to hold text & buttons
  let start = document.createElement("div");
  start.classList.add("start");
  start.innerHTML = "<h1>Start Game</h1>";
  document.querySelector(".screen").appendChild(start);
  //play button
  let play = document.createElement("button");
  play.classList.add("start-button");
  play.innerText = "Play";
  document.querySelector(".start").appendChild(play);
  document.querySelector(".start-button").addEventListener("click", pressPlay);
  // how to play instructions
  let read = document.createElement("p");
  read.classList.add("read-rules");
  read.innerText = "How to play?";
  document.querySelector(".start").appendChild(read);
  document.querySelector(".start-button").addEventListener("click", pressPlay);
  document.querySelector(".read-rules").addEventListener("click", () => {
    document.querySelector(".start").style.display = "none";
    instructions();
  });

  function clickAudio() {
    let audio = new Audio("/assets/click.mp3");
    audio.play();
  }
  document.querySelector(".start-button").addEventListener("click", clickAudio);

  function bgAudio() {
    let audio = new Audio("/assets/bgmusic.mp3");
    audio.play();
  }
  document.querySelector(".start-button").addEventListener("click", bgAudio);
}

//instructions screen
function instructions() {
  let instructions = document.createElement("div");
  instructions.classList.add("instructions");
  document.querySelector(".screen").appendChild(instructions);
  //div1
  let div1 = document.createElement("div");
  div1.classList.add("div1");
  document.querySelector(".instructions").appendChild(div1);

  //return button
  let returnButton = document.createElement("button");
  returnButton.classList.add("return");
  returnButton.innerText = "< Return";
  document.querySelector(".div1").appendChild(returnButton);
  document.querySelector(".return").addEventListener("click", () => {
    document.querySelector(".instructions").remove();
    document.querySelector(".start").style.display = "flex";
  });

  //div2
  let div2 = document.createElement("div");
  div2.classList.add("div2");
  document.querySelector(".instructions").appendChild(div2);
  div2.innerHTML = `<h1>How to play?</h1>
  <p>spacebar = jump <br />
  left key = move left <br />
  right key = move right <br />
  <br />
  Each successful jump earns you 1 point. <br />
  Game is over once you fall.
  </p>
  `;
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
character.style.top = String(parseInt(platformArr[6].style.top) - 92) + "px";
character.style.left = String(parseInt(platformArr[6].style.left) + 14) + "px";
let charLeft = parseInt(character.style.left);
let charTop = parseInt(character.style.top);

// adjust screen & character down when the character jumps.
function adjustScreen() {
  if (alive === true) {
    haveLanded = false;
    adjustingScreen = true;
    //screen is adjusting
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
        adjustingScreen = false;
        //screen has officially resetted
        landed();
        displayScore();
        character.classList.remove("isJumping");
        //jumping removed
      }
    });
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

//check if character is dead
function landed() {
  if (
    parseInt(character.style.top) ===
    screenHeight - screenHeight / (numOfPlat + 1) - 92
  ) {
    if (
      parseInt(character.style.left) >
        parseInt(platformArr[6].style.left) - 92 &&
      parseInt(character.style.left) < parseInt(platformArr[6].style.left) + 120
    ) {
      //if character survives
      haveLanded = true;
    } else {
      //character dies
      alive = false;
      if (gameIsOver === false) {
        gameOverMsg();
        gameOverAudio();
      }
      haveLanded = false;
      //character falls
      const die = setInterval(() => {
        charTop += 1;
        character.style.top = String(charTop) + "px";
        if (charTop > screenHeight) {
          //remove character from screen
          character.style.display = "none";
          //remove the fall animation
          clearInterval(die);
        }
      }, 1);
    }
  } else {
    return;
  }
}

//score
function displayScore() {
  //it must have landed to be successful, but haveLanded will also be triggered if it's just moving left and right on its current platform so I added that it must be triggered by a jump.
  if (haveLanded === true && character.classList.contains("isJumping")) {
    score += 1;
    document.querySelector(".score").style.display = "block";
    scoreNum.innerText = String(score);
    setTimeout(stopScore, 300);
  }
}

function stopScore() {
  document.querySelector(".score").style.display = "none";
}

//keyboard controls
function pressPlay() {
  document.querySelector("div.start").remove();

  document.addEventListener("keydown", (event) => {
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

    if (keys.right === true && keys.jump === true && keys.left === false) {
      //jump right
      moveRight();
      isJump();
    } else if (
      keys.right === false &&
      keys.jump === true &&
      keys.left === true
    ) {
      //jump left
      moveLeft();
      isJump();
    } else if (
      keys.right === false &&
      keys.jump === true &&
      keys.left === false
    ) {
      //jump only
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
}

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

const moveLeft = () => {
  document.querySelector(".character").style.backgroundImage =
    "var(--doodle-left-image)";
  if (keyLeftCount > 0) {
    return;
  } else {
    startLeft = setInterval(() => {
      keyLeftCount += 1;
      charLeft -= 2;
      character.style.left = String(charLeft) + "px";
      if (adjustingScreen === false) {
        landed();
      }
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
      charLeft += 2;
      character.style.left = String(charLeft) + "px";
      if (adjustingScreen === false) {
        landed();
      }
    });
  }
};

//jumps
function isJump() {
  if (character.classList.contains("isJumping") || alive === false) {
    return;
  } else {
    character.classList.add("isJumping");
    //character is jumping
    charTop -= screenHeight / (numOfPlat + 1);
    character.style.top = String(charTop) + "px";
    adjustScreen();
  }
}

// Game Over
function gameOverMsg() {
  gameIsOver = true;
  //div to hold text & buttons
  let gameover = document.createElement("div");
  gameover.classList.add("gameover");
  gameover.innerHTML = `<h1>Highscore <br> ${score}</h1>`;
  document.querySelector(".screen").appendChild(gameover);

  //div to hold buttons
  let gameoverButtons = document.createElement("div");
  gameoverButtons.classList.add("gameover-buttons");
  document.querySelector(".gameover").appendChild(gameoverButtons);

  //restart button
  let restart = document.createElement("button");
  restart.classList.add("restart");
  restart.innerText = "Play again";
  document.querySelector(".gameover-buttons").appendChild(restart);
  document.querySelector(".restart").addEventListener("click", replayGame);
}

function replayGame() {
  location.reload();
}
