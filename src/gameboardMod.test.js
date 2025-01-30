//gameboardMod.test.js

// ====================================== init/declare ====================================== //

import * as gameboardMod from "./gameboardMod.js";

// ====================================== Square ====================================== //

it("makes a Square", () => {
  const newSquare = new gameboardMod.Square();

  expect(newSquare.ship).toBe(null);
  expect(newSquare.hasHit).toBe(false);
});

it("makes a Gameboard", () => {
  const newGameboard = new gameboardMod.Gameboard();

  expect(newGameboard.board.length).toBe(10);

  newGameboard.board.forEach((row) => {
    expect(row.length).toBe(10);
  });
});

// ====================================== Get Coords ====================================== //
//pattern is: possCoords[choose which set of coords][0 for the x-coord, 1 for the y-coord]

it("return correct HORZ possible coords for ship placement", () => {
  const newGameboard = new gameboardMod.Gameboard();
  const possCoords = newGameboard.getAllShipCoords(3, [0, 0], true);

  //x-coords
  expect(possCoords[0][0]).toBe(0);
  expect(possCoords[1][0]).toBe(1);
  expect(possCoords[2][0]).toBe(2);
  //y-coords
  expect(possCoords[0][1]).toBe(0);
  expect(possCoords[1][1]).toBe(0);
  expect(possCoords[2][1]).toBe(0);
});

it("return correct VERT possible coords for ship placement", () => {
  const newGameboard = new gameboardMod.Gameboard();
  const possCoords = newGameboard.getAllShipCoords(3, [0, 0], false);

  //x-coords
  expect(possCoords[0][0]).toBe(0);
  expect(possCoords[1][0]).toBe(0);
  expect(possCoords[2][0]).toBe(0);
  //y-coords
  expect(possCoords[0][1]).toBe(0);
  expect(possCoords[1][1]).toBe(1);
  expect(possCoords[2][1]).toBe(2);
});

// ====================================== Place Ship ====================================== //

it("places ship HORZ", () => {
  const newGameboard = new gameboardMod.Gameboard();
  //simulate user input
  const userCoords = [0, 0];
  const shipLength = 3;

  //horizontal placement
  newGameboard.placeShip(shipLength, userCoords, true);
  for (let i = 0; i < shipLength; i++) {
    const tempSquare = newGameboard.board[userCoords[0] + i][userCoords[1]];
    expect(tempSquare.ship.hits).not.toBe(undefined);
  }
});

it("places ship VERT", () => {
  const newGameboard = new gameboardMod.Gameboard();
  //simulate user input
  const userCoords = [0, 0];
  const shipLength = 3;

  //vertical placement
  newGameboard.placeShip(shipLength, userCoords, false);
  for (let i = 0; i < shipLength; i++) {
    const tempSquare = newGameboard.board[userCoords[0]][userCoords[1] + i];
    expect(tempSquare.ship.hits).not.toBe(undefined);
  }
});

it("rejects out of bounds placement GOOD", () => {
  const newGameboard = new gameboardMod.Gameboard();
  const possCoords = [
    [6, 6],
    [7, 6],
    [8, 6],
  ];

  expect(newGameboard.checkForBadCoords(possCoords)).toBe(false);
});

it("rejects out of bounds placement BAD", () => {
  const newGameboard = new gameboardMod.Gameboard();
  const possCoords = [
    [8, 6],
    [9, 6],
    [10, 6],
  ];

  expect(newGameboard.checkForBadCoords(possCoords)).toBe(true);
});

it("rejects ship overlap placement BAD", () => {
  const newGameboard = new gameboardMod.Gameboard();
  newGameboard.placeShip(3, [2, 0], false);
  const possCoords = [
    [0, 2],
    [1, 2],
    [2, 2],
  ];

  expect(newGameboard.checkForBadCoords(possCoords)).toBe(true);
});

it("rejects ship placement BAD", () => {
  const newGameboard = new gameboardMod.Gameboard();
  expect(() => {
    newGameboard.placeShip(3, [9, 9], true);
  }).toThrow(
    "Ship placement has invalid coords. Check bounds and/or ship overlap."
  );
});

// ====================================== Attack ====================================== //

it("attacks empty space", () => {
  const newGameboard = new gameboardMod.Gameboard();
  expect(newGameboard.board[0][0].hasHit).toBe(false);

  newGameboard.receiveAttack([0, 0]);
  expect(newGameboard.board[0][0].hasHit).toBe(true);
});

it("attacks ship", () => {
  const newGameboard = new gameboardMod.Gameboard();
  newGameboard.placeShip(3, [0, 0], true);
  expect(newGameboard.board[0][0].ship.hits).toBe(0);

  newGameboard.receiveAttack([0, 0]);
  expect(newGameboard.board[0][0].ship.hits).toBe(1);
  //will not accept repeat attacks
  newGameboard.receiveAttack([1, 0]);
  expect(newGameboard.board[0][0].ship.hits).toBe(2);
});

it("sinks ship", () => {
  const newGameboard = new gameboardMod.Gameboard();
  newGameboard.placeShip(3, [0, 0], true);

  newGameboard.receiveAttack([0, 0]);
  newGameboard.receiveAttack([1, 0]);
  newGameboard.receiveAttack([2, 0]);

  expect(newGameboard.board[0][0].ship.sunk).toBe(true);
});

it("sinks all ships", () => {
  const newGameboard = new gameboardMod.Gameboard();
  newGameboard.placeShip(3, [0, 0], true);

  expect(newGameboard.liveShips).toBe(1);

  newGameboard.receiveAttack([0, 0]);
  newGameboard.receiveAttack([1, 0]);
  newGameboard.receiveAttack([2, 0]);

  expect(newGameboard.liveShips).toBe(0);
  expect(newGameboard.checkForGameOver()).toBe(true);
});
