import * as model from "./model.js";
import descriptionView from "./views/descriptionView.js";
import gameView from "./views/gameView.js";
import statsView from "./views/statsView.js";

const controlDescription = function (newPage) {
  model.updatePage(newPage);
  console.log(model.state.page);
  descriptionView.render(model.state.page, true);
};

const controlStart = function (newPage) {
  // try {
  // 1, Get data from input fields

  const name = gameView.getName(); // could throw an error
  const difficulty = gameView.getDifficulty();
  console.log(`name: ${name}`);
  console.log(`difficulty: ${difficulty}`);

  // 2, Load all data to state object
  model.loadData(name, difficulty);
  model.updatePage(newPage);

  console.log(model.state);

  // 3, Render game page
  gameView.render(model.state.grid);
  statsView.render(model.state);

  // 4, Upadte and render timer update
  setInterval(async () => {
    model.updateTimer();
    statsView.render(model.state);
  }, 1000);

  gameView.addHandlerTileEvent(model.updateGrid);
  console.log(model.state.grid);
  // gameView.render(model.state.grid);
  // } catch (err) {
  //   console.log(err.message);
  //   gameView.renderError();
  // }
};

const init = function () {
  descriptionView.addHandlerRender(controlDescription);
  gameView.addHandlerRender(controlStart);
};
init();
