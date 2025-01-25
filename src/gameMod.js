//gameMod.js

//imports
import * as shipMod from "./shipMod.js";
import * as gameboardMod from "./gameboardMod.js";
import * as renderMod from "./renderMod.js";
import * as playerMod from "./playerMod.js";
import * as messageMod from "./messageMod.js";

//declarations

let playerOne;
let playerTwo;
let currentPlayerTurn;
let gameState;

// ====================================== Init ====================================== //

setGameState().noGame();

// ====================================== Major Functions ====================================== //

export function progressGame() {
  if (checkForGameOver()) return;
  //else, no game over and continue
  changeCurrentPlayerTurn();
}

export function initGame() {
  renderMod.renderGameboards();

  playerOne = new playerMod.Player(true);
  playerTwo = new playerMod.Player(false);
  setGameState().setShips;

  //automatic placement for now
  placeDemoShips(playerOne);
  placeDemoShips(playerTwo);

  currentPlayerTurn = playerOne;
  setGameState().playerTurn();
}

function placeDemoShips(player) {
  //"Player" has "playerBoard" prop which is the Gameboard class, which has a "board" prop which is the actual 2D array
  const coords1 = player.playerBoard.placeShip(1, [0, 0], true);
  const coords2 = player.playerBoard.placeShip(1, [0, 1], false);

  let playerNum = player === playerOne ? 1 : 2;
  renderMod.renderShip(coords1, playerNum, true);
  renderMod.renderShip(coords2, playerNum, false);
}

export function setGameState() {
  return {
    noGame: () => (gameState = "no game"),
    setShips: () => (gameState = "set ships"),
    playerTurn: () => (gameState = "player turn"),
    gameOver: () => (gameState = "game over"),
  };
}

export function getGameState() {
  return gameState;
}

// ====================================== Lessor Functions ====================================== //

export function getPlayerNum() {
  if (currentPlayerTurn === playerOne) return 1;
  else if (currentPlayerTurn === playerTwo) return 2;
  else throw new Error("No current player");
}

export function getPlayer(playerNum) {
  return playerNum === 1 ? playerOne : playerTwo;
}

function changeCurrentPlayerTurn() {
  if (currentPlayerTurn === playerOne) currentPlayerTurn = playerTwo;
  else currentPlayerTurn = playerOne;

  if (currentPlayerTurn === playerTwo && !playerTwo.isHuman) {
  }
}

function checkForGameOver() {
  const enemyPlayer = getEnemyPlayer();
  let isGameOver = false;

  if (enemyPlayer.playerBoard.liveShips === 0) {
    setGameState().gameOver();
    isGameOver = true;
  }

  return isGameOver;
}

function getEnemyPlayer() {
  return currentPlayerTurn === playerOne ? playerTwo : playerOne;
}
