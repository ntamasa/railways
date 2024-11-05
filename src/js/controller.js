import * as model from "./model.js";
import descriptionView from "./views/descriptionView.js";
import gameView from "./views/gameView.js";

const controlDescription = function (newPage) {
  model.updatePage(newPage);

  descriptionView.render(model.state.page);
};

const controlGame = function (newPage) {
  try {
    // could throw an error
    const name = gameView.getName();
    const difficulty = gameView.getDifficulty();
    console.log(`name: ${name}`);
    console.log(`difficulty: ${difficulty}`);

    model.loadData(name, difficulty);
    model.updatePage(newPage);

    console.log(model.state);

    gameView.render(model.state);
  } catch (err) {
    console.log(err.message);
    gameView.renderError();
  }
};

const controlTimer = function () {
  // model.updateTimer();
};

const init = function () {
  descriptionView.addHandlerRender(controlDescription);
  gameView.addHandlerRender(controlGame);
  // gameView.addHandlerUpdateTimer(controlTimer);
};
init();
