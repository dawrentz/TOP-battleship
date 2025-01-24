//userMod.js

//imports
import * as shipMod from "./shipMod.js";
import * as gameboardMod from "./gameboardMod.js";
import * as renderMod from "./renderMod.js";
import * as playerMod from "./playerMod.js";
import * as gameMod from "./gameMod.js";

//declarations
const newGameBtn = document.querySelector("#new-game-button");

// ====================================== Init ====================================== //

addInitELs();

// ====================================== Major Functions ====================================== //

function addInitELs() {
  newGameBtn.addEventListener("click", newGameEL);
}

export function addNewGameELs() {
  const allEnemySquares = document.querySelectorAll(
    ".enemy-board .gameboard-square"
  );

  allEnemySquares.forEach((square) => {
    square.addEventListener("click", (event) => enemySquareEL(event));
  });
}

function newGameEL() {
  //alert are you sure? (if no current game)
  //switch to restart
  gameMod.initGame();
}

function enemySquareEL(event) {
  //handle game no start yet
  if (!gameMod.getPlayer(1)) return;

  const currentPlayerNum = gameMod.getPlayerNum();
  let enemyNum;
  let activeBoardID;

  if (currentPlayerNum === 1) {
    activeBoardID = "player-one-enemy-board";
    enemyNum = 2;
  } else {
    activeBoardID = "player-two-enemy-board";
    enemyNum = 1;
  }

  if (event.target.parentElement.parentElement.id === activeBoardID) {
    const xCoord = +event.target.getAttribute("data-x-coord");
    const yCoord = +event.target.getAttribute("data-y-coord");

    const enemy = gameMod.getPlayer(enemyNum);

    const attackRecieved = enemy.playerBoard.receiveAttack([xCoord, yCoord]);
    if (attackRecieved) {
      //render attack on DOM if attackRecieved is true
      renderMod.renderAttack([xCoord, yCoord], enemyNum);
      gameMod.changeCurrentPlayerTurn();
    }
  }
}

// ====================================== Lessor Functions ====================================== //
