//renderMod.js

//imports
// import * as gameboardMod from "./gameboardMod.js";

//declarations
const playerOneBoardsContainer = document.querySelector(
  "#player-one-gameboards"
);
const playerTwoBoardsContainer = document.querySelector(
  "#player-two-gameboards"
);

// ====================================== Init ====================================== //

// ====================================== Major Functions ====================================== //

function renderGameboards() {
  const gameboards = document.querySelectorAll(".gameboard");

  gameboards.forEach((gameboard) => {
    createGameboard(gameboard);
  });
}
function createGameboard(boardContainer) {
  //create rows first
  for (let i = 0; i <= 9; i++) {
    const gameboardRow = document.createElement("div");
    gameboardRow.classList.add("gameboard-row");

    //create squares in rows
    for (let j = 0; j <= 9; j++) {
      const gameboardSquare = document.createElement("div");
      gameboardSquare.classList.add("gameboard-square");
      gameboardSquare.dataset["xCoord"] = j; //converts to data-x-coord in DOM
      gameboardSquare.dataset["yCoord"] = i; //converts to data-y-coord in DOM

      gameboardRow.appendChild(gameboardSquare);
    }

    boardContainer.appendChild(gameboardRow);
  }
}

export function renderShip(coordSets, playerNum, isHorz) {
  let gameboardsContainer;
  if (playerNum === 1) gameboardsContainer = playerOneBoardsContainer;
  else if (playerNum === 2) gameboardsContainer = playerTwoBoardsContainer;
  else throw new Error("Must specify playerNum");
  const playerBoardDOM = gameboardsContainer.querySelector("#player-one-board");
  //test
  console.log(playerNum);

  coordSets.forEach((coordSet) => {
    const xCoord = coordSet[0];
    const yCoord = coordSet[1];
    const boardSquareDOM = playerBoardDOM.querySelector(
      `[data-x-coord="${xCoord}"][data-y-coord="${yCoord}"]`
    );
    //add classes for css
    boardSquareDOM.classList.add("square-has-ship");
    isHorz === true
      ? boardSquareDOM.classList.add("horz")
      : boardSquareDOM.classList.add("vert");

    //set outline for horz/vert top/mid/end
    if (coordSet === coordSets[coordSets.length - 1]) console.log(coordSet);
  });
}

// ====================================== Lessor Functions ====================================== //

// ====================================== testing ====================================== //

renderGameboards();
