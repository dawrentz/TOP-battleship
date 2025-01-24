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

export function updatePlayerTurn() {
  let playerNumText;
  if (gameMod.getPlayerNum() === 1) playerNumText = "one's";
  else playerNumText = "two's";
  updateMessage(`Player ${playerNumText} turn`);
}

export function gameOver(playerNum) {
  let playerNumText;
  if (gameMod.getPlayerNum() === 1) playerNumText = "one";
  else playerNumText = "two";
  updateMessage(`Player ${playerNumText} wins!`);
}

// ====================================== Lessor Functions ====================================== //

function updateMessage(message) {
  messageDiv.textContent = message;
}
