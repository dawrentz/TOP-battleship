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
        const newSquare = new Square();
        row.push(newSquare);
      }
    });

    return board;
  }
}

export class Square {
  constructor() {
    this.hasShip = false;
    this.hasHit = false;
  }
}

// ====================================== Lessor Functions ====================================== //

const testGameboard = new Gameboard();
console.log(testGameboard.board);
