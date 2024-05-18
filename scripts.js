import Render from "./classes/render.js";

let render;

window.onload = function () {
  render = new Render();
  render.renderInitialPage();
};
