//playerMod.js

//imports
import * as gameboardMod from "./gameboardMod.js";

//declarations

// ====================================== Init ====================================== //

// ====================================== Major Functions ====================================== //

export class Player {
  constructor(isHuman) {
    this.playerBoard = new gameboardMod.Gameboard();
    this.isHuman = isHuman;
  }
  //computer moves go here?

  suggestShip() {
    //exclude humans
    if (!this.isHuman) {
      //select random coords and check
      // return //coords;
    }
  }
}

// ====================================== testing ====================================== //

// const newPlayer = new Player(true);
// console.log(newPlayer.board);
