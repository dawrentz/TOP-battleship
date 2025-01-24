//userMod.js

//imports
import * as shipMod from "./shipMod.js";
import * as gameboardMod from "./gameboardMod.js";
import * as renderMod from "./renderMod.js";
import * as playerMod from "./playerMod.js";
import * as gameMod from "./gameMod.js";

//declarations
const newGameBtn = document.querySelector("#new-game-button");

// ====================================== Init ====================================== //

addELs();

// ====================================== Major Functions ====================================== //

function addELs() {
  newGameBtn.addEventListener("click", newGameEL);
}

function newGameEL() {
  //alert are you sure? (if no current game)
  //switch to restart
  gameMod.initGame();
}

// ====================================== Lessor Functions ====================================== //
