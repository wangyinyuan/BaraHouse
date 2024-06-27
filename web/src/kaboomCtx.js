import kaboom from "kaboom";

export const k = kaboom({
  global: false,
  touchToMouse: true,
  canvas: document.querySelector('#game-view'),
  debug: true,
})