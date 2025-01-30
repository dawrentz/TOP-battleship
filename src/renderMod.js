//renderMod.js

//imports
import * as userMod from "./userMod.js";
import * as gameMod from "./gameMod.js";

//declarations
const playerOneBoardsContainer = document.querySelector(
  "#player-one-gameboards"
);
//hidden for computer players
const playerTwoBoardsContainer = document.querySelector(
  "#player-two-gameboards"
);

// ====================================== Major Functions ====================================== //

export function renderGameboards() {
  const gameboards = document.querySelectorAll(".gameboard");

  gameboards.forEach((gameboard) => {
    gameboard.innerHTML = "";
    createGameboard(gameboard);
  });

  userMod.addNewGameELs();
}

function createGameboard(boardContainer) {
  //create rows first
  for (let i = 0; i <= 9; i++) {
    const gameboardRow = document.createElement("div");
    gameboardRow.classList.add("gameboard-row");

    //create squares in rows for "columns"
    for (let j = 0; j <= 9; j++) {
      const gameboardSquare = document.createElement("div");
      gameboardSquare.classList.add("gameboard-square");
      gameboardSquare.dataset["xCoord"] = j; //property converts to data-x-coord in DOM
      gameboardSquare.dataset["yCoord"] = i; //property converts to data-y-coord in DOM

      gameboardRow.appendChild(gameboardSquare);
    }

    boardContainer.appendChild(gameboardRow);
  }
}

export function renderShip(coordSets, playerNum, isHorz) {
  const boards = getPlayerBoards(playerNum);

  //find/edit specific DOM square from ship coords
  coordSets.forEach((coordSet) => {
    const xCoord = coordSet[0];
    const yCoord = coordSet[1];
    const boardSquareDOM = boards.playerBoardDOM.querySelector(
      `[data-x-coord="${xCoord}"][data-y-coord="${yCoord}"]`
    );

    boardSquareDOM.classList.add("square-has-ship");
    isHorz === true
      ? boardSquareDOM.classList.add("horz")
      : boardSquareDOM.classList.add("vert");

    //set border class for last part of ship (nicer styling)
    if (coordSet === coordSets[coordSets.length - 1]) {
      boardSquareDOM.classList.add("end-of-ship");
    }
  });
}

export function renderAttack(coordSet, receivingPlayerNum) {
  let attackingPlayerNum;
  if (receivingPlayerNum === 1) attackingPlayerNum = 2;
  else attackingPlayerNum = 1;

  const recievingPlayerBoards = getPlayerBoards(receivingPlayerNum);
  const attackingPlayerBoards = getPlayerBoards(attackingPlayerNum);

  const xCoord = coordSet[0];
  const yCoord = coordSet[1];
  //find/edit specific DOM square from ship coords
  //add x to enemy-board
  editHitSquareDOM(recievingPlayerBoards.playerBoardDOM, xCoord, yCoord);
  //add x to player-enemy-board
  editHitSquareDOM(attackingPlayerBoards.enemyBoardDOM, xCoord, yCoord);
}

// ====================================== Lessor Functions ====================================== //

function getPlayerBoards(playerNum) {
  let gameboardsContainer;
  if (playerNum === 1) gameboardsContainer = playerOneBoardsContainer;
  else if (playerNum === 2) gameboardsContainer = playerTwoBoardsContainer;
  else throw new Error("Must specify playerNum");
  const playerBoardDOM = gameboardsContainer.querySelector(".player-board");
  const enemyBoardDOM = gameboardsContainer.querySelector(".enemy-board");

  return {
    gameboardsContainer,
    playerBoardDOM,
    enemyBoardDOM,
  };
}

function editHitSquareDOM(board, xCoord, yCoord) {
  const editSquareDOM = board.querySelector(
    `[data-x-coord="${xCoord}"][data-y-coord="${yCoord}"]`
  );
  editSquareDOM.classList.add("has-hit");
  const tempDiv = document.createElement("div");
  tempDiv.classList.add("x-hit-div");
  tempDiv.textContent = "X";
  editSquareDOM.appendChild(tempDiv);

  //add has ship class if needed
  checkForShip(board, editSquareDOM, xCoord, yCoord);
}

function checkForShip(board, square, xCoord, yCoord) {
  let playerToCheck;
  //if editing player one's enemy board, we want to check player 2's board for a ship in that square
  if (board.id === "player-one-enemy-board") {
    playerToCheck = gameMod.getPlayer(2);
  } else if (board.id === "player-two-enemy-board") {
    playerToCheck = gameMod.getPlayer(1);
  } else return; //excludes player boards

  if (playerToCheck.playerBoard.board[xCoord][yCoord].ship) {
    square.classList.add("square-has-enemy-ship");
  }
}
