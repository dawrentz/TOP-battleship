//userMod.js

//imports
import * as shipMod from "./shipMod.js";
import * as gameboardMod from "./gameboardMod.js";
import * as renderMod from "./renderMod.js";
import * as playerMod from "./playerMod.js";
import * as gameMod from "./gameMod.js";
import * as messageMod from "./messageMod.js";

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
    square.addEventListener("click", (event) => attackEnemySquareEL(event));
  });
}

// ====================================== EL Functions ====================================== //

function newGameEL() {
  //alert are you sure? (if no current game)
  //switch to restart
  gameMod.initGame();
  messageMod.setShips(); //change to "set ships"
}

function attackEnemySquareEL(event) {
  let gameState = gameMod.getGameState();
  //handle game no active game
  if (gameState !== "player turn") return;

  //get correct board information
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

  //only render changes on enemy board
  //call gameBoard.recieveAttack here?
  if (event.target.parentElement.parentElement.id === activeBoardID) {
    const xCoord = +event.target.getAttribute("data-x-coord");
    const yCoord = +event.target.getAttribute("data-y-coord");

    const enemy = gameMod.getPlayer(enemyNum);

    const attackRecieved = enemy.playerBoard.receiveAttack([xCoord, yCoord]);
    if (attackRecieved) {
      //render attack on DOM if attackRecieved is true
      renderMod.renderAttack([xCoord, yCoord], enemyNum);

      gameMod.progressGame();
      gameState = gameMod.getGameState();
      if (gameState === "player turn") messageMod.updatePlayerTurn();
      if (gameState === "game over") messageMod.gameOver();
    }
  }

  //if attack fails, message
}
