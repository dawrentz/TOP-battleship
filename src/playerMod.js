//playerMod.js

//imports
import * as gameboardMod from "./gameboardMod.js";
import * as gameMod from "./gameMod.js";
import * as renderMod from "./renderMod.js";
import * as messageMod from "./messageMod.js";

//declarations

// ====================================== Init ====================================== //

// ====================================== Major Functions ====================================== //

//leaving isHuman for possible future two player
export class Player {
  constructor(isHuman) {
    this.playerBoard = new gameboardMod.Gameboard();
    this.isHuman = isHuman;
    this.compMovesToMake = [];
  }
  //computer moves go here?

  compAttack(enemy) {
    //exclude humans
    if (!this.isHuman) {
      const attackCoords = this.computerGetNextMove();

      if (!enemy.playerBoard.receiveAttack(attackCoords)) {
        return this.compAttack(enemy);
      }
      //timeouts simulate "thinking"
      else {
        renderMod.renderAttack(attackCoords, 1);
        gameMod.progressGame();
        messageMod.checkMessage();
        // setTimeout(() => {
        //   renderMod.renderAttack(attackCoords, 1);
        //   gameMod.progressGame();
        //   messageMod.checkMessage();
        // }, 1000);

        //add attacks
        this.checkForAddAdjacentAttacks(enemy, attackCoords);
      }
    }
  }

  computerGetNextMove() {
    //exclude humans
    if (!this.isHuman) {
      if (this.compMovesToMake.length === 0) {
        this.compMovesToMake.push(gameMod.getRandCoords());
      }

      const nextMove = this.compMovesToMake.shift();
      return nextMove;
    }
  }

  checkForAddAdjacentAttacks(enemy, attackCoords) {
    const xCoord = attackCoords[0];
    const yCoord = attackCoords[1];
    let rawAdjacentCoords = [];

    if (enemy.playerBoard.board[xCoord][yCoord].ship) {
      rawAdjacentCoords = [
        // [xCoord - 1, yCoord + 1],
        // [xCoord - 1, yCoord - 1],
        // [xCoord + 1, yCoord + 1],
        // [xCoord + 1, yCoord - 1],
        [xCoord - 1, yCoord + 0],
        [xCoord + 0, yCoord - 1],
        [xCoord + 0, yCoord + 1],
        [xCoord + 1, yCoord + 0],
      ];
    }

    //receiveAttack checks for bad coords
    this.compMovesToMake = rawAdjacentCoords.concat(this.compMovesToMake);
  }
}

// ====================================== testing ====================================== //

// const newPlayer = new Player(false);
// newPlayer.computerGetNextMove();
// console.log(newPlayer.computerGetNextMove());
// console.log(newPlayer.board);

// const one = [
//   [1, 1],
//   [2, 2],
// ];
// const two = [[0, 0]];
// console.log(two.concat(one));
