//messageMod.js

//imports
import * as gameMod from "./gameMod.js";

//declarations
const messageDiv = document.querySelector("#message-div");

// ====================================== Init ====================================== //

// ====================================== Major Functions ====================================== //

export function checkMessage() {
  const gameState = gameMod.getGameState();

  if (gameState === "no game") newGame();
  if (gameState === "set ships") setShips();
  if (gameState === "player turn") updatePlayerTurn();
  if (gameState === "game over") gameOver();
}

function newGame() {
  updateMessage("Press button to begin game");
}

function setShips() {
  updateMessage("Player One, set your ships");
}

function updatePlayerTurn() {
  let playerNumText;
  if (gameMod.getPlayerNum() === 1) playerNumText = "one's";
  else if (gameMod.getPlayerNum() === 2) playerNumText = "two's";
  else throw new Error("no current player");
  updateMessage(`Player ${playerNumText} turn`);
}

function gameOver() {
  let playerNumText;
  if (gameMod.getPlayerNum() === 1) playerNumText = "one";
  else if (gameMod.getPlayerNum() === 2) playerNumText = "two";
  else throw new Error("no current player");
  updateMessage(`Player ${playerNumText} wins!`);
}

// ====================================== Lessor Functions ====================================== //

function updateMessage(message) {
  messageDiv.textContent = message;
}
