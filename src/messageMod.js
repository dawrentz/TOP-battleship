//messageMod.js

//imports
import * as gameMod from "./gameMod.js";

//declarations
const messageDiv = document.querySelector("#message-div");

// ====================================== Init ====================================== //

// ====================================== Major Functions ====================================== //

export function newGame() {
  updateMessage("Press button to begin game");
}

export function setShips() {
  updateMessage("Player One, set your ships");
}

export function updatePlayerTurn() {
  let playerNumText;
  if (gameMod.getPlayerNum() === 1) playerNumText = "one's";
  else if (gameMod.getPlayerNum() === 2) playerNumText = "two's";
  else throw new Error("no current player");
  updateMessage(`Player ${playerNumText} turn`);
}

export function gameOver(playerNum) {
  let playerNumText;
  if (playerNum === 1) playerNumText = "one";
  else playerNumText = "two";
  updateMessage(`Player ${playerNumText} wins!`);
}

// ====================================== Lessor Functions ====================================== //

function updateMessage(message) {
  messageDiv.textContent = message;
}
