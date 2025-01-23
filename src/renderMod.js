//renderMod.js

//imports
// import * as gameboardMod from "./gameboardMod.js";

//declarations
const gameboards = document.querySelector(".gameboards");

// ====================================== Init ====================================== //

// ====================================== Major Functions ====================================== //

function renderGameboards(board) {
  const playerOneBoard = gameboards.querySelector(".player-one-board");
  const playerTwoBoard = gameboards.querySelector(".player-two-board");
  createGameboard(playerOneBoard);
  createGameboard(playerTwoBoard);
}
function createGameboard(board) {
  //create rows first
  for (let i = 0; i <= 9; i++) {
    const gameboardRow = document.createElement("div");
    gameboardRow.classList.add("gameboard-row");

    //create squares in rows
    for (let j = 0; j <= 9; j++) {
      const gameboardSquare = document.createElement("div");
      gameboardSquare.classList.add("gameboard-square");
      gameboardSquare.dataset["xCoord"] = i; //converts to data-x-coord in DOM
      gameboardSquare.dataset["yCoord"] = j; //converts to data-y-coord in DOM

      gameboardRow.appendChild(gameboardSquare);
    }

    board.appendChild(gameboardRow);
  }
}

// ====================================== Lessor Functions ====================================== //

// ====================================== testing ====================================== //
renderGameboards();
