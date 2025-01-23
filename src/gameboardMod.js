//gameboardMod.js

//imports
import * as shipMod from "./shipMod.js";

//declarations

// ====================================== Init ====================================== //

// ====================================== Major Functions ====================================== //

export class Gameboard {
  constructor() {
    this.pointer = null;
    this.board = this.createGameboard();
    this.liveShips = 0;
  }

  receiveAttack(coordSet) {
    const xCoord = coordSet[0];
    const yCoord = coordSet[1];
    const thisSquare = this.board[xCoord][yCoord];

    //handle previous attack
    if (thisSquare.hasHit === true)
      throw new Error("Square has already been attacked");

    //handle ship attack
    if (thisSquare.ship !== null) {
      thisSquare.ship.hit();
      this.checkForSunk(thisSquare.ship);
    }

    //update square
    thisSquare.hasHit = true;

    //check for game over
    if (this.checkForGameOver === true) {
      //end game
    }
  }

  checkForGameOver() {
    return this.liveShips === 0 ? true : false;
  }

  checkForSunk(ship) {
    if (ship.sunk === true) this.liveShips--;
  }

  placeShip(shipLength, headCoords, isHorz) {
    const possCoords = this.getAllShipCoords(shipLength, headCoords, isHorz);

    const newShip = new shipMod.Ship(shipLength);

    possCoords.forEach((coordSet) => {
      const xCoord = coordSet[0];
      const yCoord = coordSet[1];
      this.board[xCoord][yCoord].ship = newShip;
    });

    this.liveShips++;
  }

  //needs check for out of bounds and collisions
  getAllShipCoords(shipLength, headCoordsArr, isHorz) {
    let allCoords = [];
    const headXcoord = headCoordsArr[0];
    const headYcoord = headCoordsArr[1];

    //horz placement
    if (isHorz === true) {
      for (let i = 0; i < shipLength; i++) {
        allCoords.push([headXcoord + i, headYcoord]);
      }
    }
    //vert placement
    else if (isHorz === false) {
      for (let i = 0; i < shipLength; i++) {
        allCoords.push([headXcoord, headYcoord + i]);
      }
    }
    //error handle
    else {
      throw new Error("isHorz must be boolen");
    }
    return allCoords;
  }

  createGameboard() {
    const board = [];
    const numOfRows = 10;
    const numOfCols = 10;
    //add desired number of rows (blank arrays)
    for (let i = 0; i < numOfRows; i++) board.push([]);
    //add Square objects to make columns
    board.forEach((row) => {
      for (let i = 0; i < numOfCols; i++) {
        row.push(new Square());
      }
    });

    return board;
  }
}

export class Square {
  constructor() {
    this.hasHit = false;
    this.ship = null;
  }
}

// ====================================== Lessor Functions ====================================== //

// ====================================== testing ====================================== //

const testGameboard = new Gameboard();
const newSquare = new Square();

// console.log(testGameboard.placeShip(3, [1, 1], true));
// console.log(newSquare.ship);
// console.log(testGameboard.board);
