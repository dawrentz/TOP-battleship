//gameMod.js

//imports
import * as gameboardMod from "./gameboardMod.js";
import * as renderMod from "./renderMod.js";
import * as playerMod from "./playerMod.js";

//declarations
let playerOne;
let playerTwo;
let currentPlayerTurn;
let gameState;

const shipLengths = [4, 3, 2, 1, 1, 2, 1, 2, 3, 1];
// export const shipLengths = [1, 2]; //testing
// document.querySelector("#player-two-gameboards").style = "display: grid"; //testing

// ====================================== Init ====================================== //

setGameState().noGame();

// ====================================== Major Functions ====================================== //

export function progressGame() {
  if (checkForGameOver()) return;

  changeCurrentPlayerTurn();
}

export function initGame() {
  renderMod.renderGameboards();

  playerOne = new playerMod.Player(true);
  playerTwo = new playerMod.Player(false);
  setGameState().setShips();

  randomizeShipPlacement(playerOne);
  randomizeShipPlacement(playerTwo);
  //game waits for confirmation after ship placement to start
}

export function startGame() {
  setGameState().playerTurn();
  currentPlayerTurn = playerOne;
}

function randomizeShipPlacement(player) {
  const randShipList = suggestShips();
  let playerNum = player === playerOne ? 1 : 2;

  randShipList.forEach((ship) => {
    const coords = player.playerBoard.placeShip(
      ship.shipLength,
      ship.coords,
      ship.isHorz
    );

    renderMod.renderShip(coords, playerNum, ship.isHorz);
  });
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

export function suggestShips() {
  //use a test gameboards to see if coords work, then send good coords to actual gameboard
  const tempGameboard = new gameboardMod.Gameboard();
  const suggestedShips = [];
  shipLengths.forEach((shipLength) => {
    const randShip = testRandomShip(tempGameboard, shipLength);
    suggestedShips.push({
      coords: randShip.randCoords,
      isHorz: randShip.randIsHorz,
      shipLength,
    });
  });

  return suggestedShips;
}

function testRandomShip(board, shipLength) {
  const randCoords = getRandCoords();
  const randIsHorz = getRandIsHorz();
  const validShip = board.placeShip(shipLength, randCoords, randIsHorz);

  if (!validShip) return testRandomShip(board, shipLength); //re-run till valid
  return { randCoords, randIsHorz };
}

// should be in a helper module?
export function getRandCoords() {
  const xCoord = Math.floor(Math.random() * 10);
  const yCoord = Math.floor(Math.random() * 10);
  return [xCoord, yCoord];
}

function getRandIsHorz() {
  return Math.floor(Math.random() * 2) === 0 ? true : false;
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

  //run comp turn
  if (currentPlayerTurn === playerTwo && !playerTwo.isHuman) {
    playerTwo.compAttack(playerOne);
  }
}

function checkForGameOver() {
  const enemyPlayer = getEnemyPlayer();
  let isGameOver = false;

  if (enemyPlayer.playerBoard.checkForGameOver()) {
    setGameState().gameOver();
    isGameOver = true;
  }

  return isGameOver;
}

function getEnemyPlayer() {
  return currentPlayerTurn === playerOne ? playerTwo : playerOne;
}
