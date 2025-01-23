//shipMod.js

//imports

//declarations

// ====================================== Init ====================================== //

// ====================================== Major Functions ====================================== //

export class Ship {
  constructor(shipLength) {
    this.shipLength = shipLength;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits++;
    this.isSunk();
  }

  isSunk() {
    if (this.hits === this.shipLength) this.sunk = true;
  }
}

// ====================================== Lessor Functions ====================================== //
