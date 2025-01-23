//playerMod.js

//imports
import * as gameboardMod from "./gameboardMod.js";

//declarations

// ====================================== Init ====================================== //

// ====================================== Major Functions ====================================== //

class Player {
  constructor(isHuman) {
    this.board = new gameboardMod.Gameboard();
    this.isHuman = isHuman;
  }
}

// ====================================== testing ====================================== //

// const newPlayer = new Player(true);
// console.log(newPlayer.board);
