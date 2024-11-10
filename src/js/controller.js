import * as model from "./model.js";
import descriptionView from "./views/descriptionView.js";
import gameView from "./views/gameView.js";
import statsView from "./views/statsView.js";
import toplistView from "./views/toplistView.js";

const controlDescription = function (newPage) {
  model.updatePage(newPage);
  descriptionView.render(model.state.page, true);
};

const controlGame = function (newPage) {
  // 1, Get data from input fields
  const name = gameView.getName(); // could throw an error
  const difficulty = gameView.getDifficulty();

  // 2, Load all data to state object
  model.loadData(name, difficulty);
  model.updatePage(newPage);

  // 3, Render game page
  gameView.render(model.state.grid);
  statsView.render(model.state);

  // 4, Upadte and render timer update
  model.startTimer();
  setInterval(() => {
    statsView.render(model.state);
  }, 1000);

  // 4, Handle click event on a field
  gameView.addHandlerTileEvent(model.updateGrid, model.state.grid);

  toplistView.render(model.state.toplist);
};

const controlToplist = function () {
  toplistView.render(model.state.toplist);
  toplistView.toggleOpen();

  if (model.state.isOver) toplistView.render(model.state.toplist);
};

const init = function () {
  descriptionView.addHandlerRender(controlDescription);
  gameView.addHandlerRender(controlGame);
  toplistView.addHandlerRender(controlToplist);
};
init();
