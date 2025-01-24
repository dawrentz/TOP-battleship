//gameMod.js

//imports
import * as shipMod from "./shipMod.js";
import * as gameboardMod from "./gameboardMod.js";
import * as renderMod from "./renderMod.js";
import * as playerMod from "./playerMod.js";

//declarations

// ====================================== Init ====================================== //

let playerOne;
let playerTwo;
let currentPlayerTurn;

// ====================================== Major Functions ====================================== //

export function initGame() {
  playerOne = new playerMod.Player(true);
  playerTwo = new playerMod.Player(false);
  currentPlayerTurn = playerOne;

  //automatic placement for now
  placeDemoShips(playerOne);
  changeCurrentPlayerTurn();
  placeDemoShips(playerTwo);
  changeCurrentPlayerTurn();
}

function placeDemoShips(player) {
  //"Player" has "playerBoard" prop which is the Gameboard class, which has a "board" prop (which is the actual 2D array)
  const coords1 = player.playerBoard.placeShip(3, [0, 0], true);
  const coords2 = player.playerBoard.placeShip(2, [0, 1], false);
  const playerNum = getPlayerNum();
  renderMod.renderShip(coords1, playerNum, true);
  renderMod.renderShip(coords2, playerNum, false);
}

// ====================================== Lessor Functions ====================================== //

export function getPlayerNum() {
  if (currentPlayerTurn === playerOne) return 1;
  return 2;
}
export function getPlayer(playerNum) {
  return playerNum === 1 ? playerOne : playerTwo;
}

function changeCurrentPlayerTurn() {
  if (currentPlayerTurn === playerOne) currentPlayerTurn = playerTwo;
  else currentPlayerTurn = playerOne;
}
