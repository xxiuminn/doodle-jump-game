# Doodle Jump (Same same but different)

## About The Game

Inspired by the classic Doodle Jump, this platformer game challenges players to leap from platform to platform in an endless ascent, all while avoiding a fall. However, unlike the original, my version gives players full control over each jump and restricts players from falling back onto previous platforms, introducing a new level of skill and challenge.

<img src = "readme/doodle-jump-demo.gif" width = "1200">
<a href="https://xxiuminn.github.io/doodle-jump/">Click here to try out my version of the game!</a>

## Technologies Used

- HTML
- CSS
- Vanilla Javascript
- _Bonus:_ 2 weeks of learning the languages mentioned above without any prior programming experience.

## Game Design

<img src = "readme/sequence-of-events.png" width = "1200">

To design the game, I need to achieve these 4 main goals:

1. Triggering player movements
2. Animating movements
3. Determining if the player has landed
4. Animating landing and falling

## Detecting Player Movement

Considering the various keyboard controls, here are the actions that a player could possibly take:

- <b>Move left:</b> Press the left arrow key only.
- <b>Move right:</b> Press the right arrow key only.
- <b>Jump:</b> Press the spacebar only.
- <b>Jump left:</b>
  - Press spacebar and left arrow key simultaneously.
  - Press spacebar first, then press left arrow key while still holding the spacebar.
  - Press left arrow key first, then press spacebar while still holding the left arrow key.
- <b>Jump right:</b>
  - Press spacebar and right arrow key simultaneously.
  - Press spacebar first, then press right arrow key while still holding the spacebar.
  - Press right arrow key first, then press spacebar while still holding the right arrow key.

### Methods Used:

The initial idea might be to use addEventListener for keydown events. However, a limitation of solely using addEventListener is its inability to handle two keydown events simultaneously. This means that if a player tries to jump left or jump right, only the first keydown event will be registered. This is problematic because executing only one of the keys will result in the player missing the landing, as precise movements are necessary.

To address this, I need to have an addEventListener for keyup events as well, and introduce new variables to track which keys are pressed simultaneously.

## Animating Movements

### For Pure Left & Right Movements:

When holding down the left or right key, one would naturally expect the character to move continuously, as is common in most games.However, another limitation of using addEventListener is that one press equates to one trigger, so the player can only move the set distance for that single press. Holding the key longer would not result in additional movement.

### Methods Used:

To achieve smooth left and right movements and allow the character to continue moving when the key is held down, I use a setInterval to repeatedly check if the key remains pressed and clearInterval when the key is released.

```
    startLeft = setInterval(() =>
    {
      charLeft -= 2;
      character.style.left = String(charLeft) + "px";
});
```

```
document.addEventListener("keyup", (event) =>
{ switch (event.key) {
  case "ArrowLeft":
      keys.left = false;
      clearInterval(startLeft);
      break;
      }
});
```

### For Jumps only:

The actual height of the jump holds little significance; what truly counts is where the player lands after executing the jump. Consequently, I opted for CSS keyframes to animate the upward motion, as I do not need to precisely track the player's position while ascending. I positioned the apex of the jump at the midpoint of the frame's height, albeit this detail is relatively inconsequential.

A challenge with CSS keyframes is that once the animation reaches 100%, the player reverts to its original position or platform, which is not our desired outcome; instead, the player should land on the next platform.

```
.isJumping {
  animation: jump 400ms;
}

@keyframes jump {
  50% {
    top: 50%;
  }
}
```

To manage the downward movement of the jump, I intervened the CSS animation and implemented another setInterval to override the descent animation. This allowed me to preset the player's final position after each jump.

```
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
      }})
```

## Determining If Player Landed

## Animating Landing & Falling
