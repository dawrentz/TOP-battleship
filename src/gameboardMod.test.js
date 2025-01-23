//gameboardMod.test.js

import * as gameboardMod from "./gameboardMod.js";

it("make a Square", () => {
  const newSquare = new gameboardMod.Square();

  expect(newSquare.hasShip).toBe(false);
  expect(newSquare.hasHit).toBe(false);
});
