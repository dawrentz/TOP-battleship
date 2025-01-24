//gameMod.js

//imports
import * as shipMod from "./shipMod.js";
import * as gameboardMod from "./gameboardMod.js";
import * as renderMod from "./renderMod.js";
import * as playerMod from "./playerMod.js";

//declarations

// ====================================== Init ====================================== //

let playerOne = null;
let playerTwo = null;
let currentPlayerTurn = playerOne;

// ====================================== Major Functions ====================================== //

export function initGame() {
  playerOne = new playerMod.Player(true);
  playerTwo = new playerMod.Player(false);

  //automatic placement for now
  placeDemoShips(playerOne);
  console.log(playerOne.playerBoard.board[0][0].ship);
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

function getPlayerNum() {
  if (currentPlayerTurn === playerOne || currentPlayerTurn === null) return 1;
  else return 2;
}
