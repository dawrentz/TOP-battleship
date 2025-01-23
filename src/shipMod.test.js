//shipMod.test.js

import * as shipMod from "./shipMod.js";

it("makes Ship class instance", () => {
  const newShip = new shipMod.Ship(3);

  expect(newShip.shipLength).toBe(3);
  expect(newShip.hits).toBe(0);
  expect(newShip.sunk).toBe(false);
});

it("adds hit to Ship instance", () => {
  const newShip = new shipMod.Ship(3);
  newShip.hit();

  expect(newShip.hits).toBe(1);
});

it("sinks Ship", () => {
  const newShip = new shipMod.Ship(3);
  newShip.hit();
  newShip.hit();
  newShip.hit();

  expect(newShip.sunk).toBe(true);
});
