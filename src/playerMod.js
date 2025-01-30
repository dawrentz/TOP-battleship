//playerMod.js

//imports
import * as gameboardMod from "./gameboardMod.js";
import * as gameMod from "./gameMod.js";
import * as renderMod from "./renderMod.js";
import * as messageMod from "./messageMod.js";

// ====================================== Major Functions ====================================== //

//leaving isHuman for possible future two player
export class Player {
  constructor(isHuman) {
    this.playerBoard = new gameboardMod.Gameboard();
    this.isHuman = isHuman;
    this.compMovesToMake = [];
  }

  compAttack(enemy) {
    //exclude humans
    if (!this.isHuman) {
      const attackCoords = this.computerGetNextMove();

      //re-run until valid attack
      if (!enemy.playerBoard.receiveAttack(attackCoords)) {
        return this.compAttack(enemy);
      }
      //timeout simulates "thinking"
      else {
        setTimeout(() => {
          renderMod.renderAttack(attackCoords, 1);
          gameMod.progressGame();
          messageMod.checkMessage();
        }, 500);

        //add ajacent attacks
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
    let adjacentCoords = [];

    if (enemy.playerBoard.board[xCoord][yCoord].ship) {
      //uncomment for diagonal attacks
      adjacentCoords = [
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

    //receiveAttack will check for bad coords
    this.compMovesToMake = adjacentCoords.concat(this.compMovesToMake);
  }
}
