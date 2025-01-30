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
const randomShipsBtn = document.querySelector("#random-ships-btn");
const readyBtn = document.querySelector("#ready-btn");
const setShipsDiv = document.querySelector("#set-ships-div");

// ====================================== Init ====================================== //

addInitELs();

// ====================================== Major Functions ====================================== //

function addInitELs() {
  newGameBtn.addEventListener("click", newGameEL);
  //randomships button just does init game again
  randomShipsBtn.addEventListener("click", newGameEL);
  readyBtn.addEventListener("click", readyBtnEL);
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

function readyBtnEL() {
  setShipsDiv.style = "visibility: hidden";
  gameMod.startGame();
  messageMod.checkMessage();
}

function newGameEL() {
  gameMod.initGame();
  messageMod.checkMessage(); //change to "set ships"
  setShipsDiv.style = "visibility: visible";
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
  if (event.target.parentElement.parentElement.id === activeBoardID) {
    const xCoord = +event.target.getAttribute("data-x-coord");
    const yCoord = +event.target.getAttribute("data-y-coord");

    const enemy = gameMod.getPlayer(enemyNum);

    const attackRecieved = enemy.playerBoard.receiveAttack([xCoord, yCoord]);
    if (attackRecieved) {
      //render attack on DOM if attackRecieved is true
      renderMod.renderAttack([xCoord, yCoord], enemyNum);

      gameMod.progressGame();
      messageMod.checkMessage();
    }
  }

  //if attack fails, message
}
