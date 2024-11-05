import * as model from "./model.js";
import descriptionView from "./views/descriptionView.js";
import gameView from "./views/gameView.js";
import statsView from "./views/statsView.js";

const controlDescription = function (newPage) {
  model.updatePage(newPage);
  console.log(model.state.page);
  descriptionView.render(model.state.page, true);
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
    statsView.render(model.state, true);

    // TODO show state update of timer in the DOM
    model.updateTimer();
    statsView.render(model.state);
  } catch (err) {
    console.log(err.message);
    gameView.renderError();
  }
};

const controlTimer = function () {
  model.updateTimer();
  statsView.render(model.state, true);
  console.log(model.state.timeElapsed);
};

const init = function () {
  descriptionView.addHandlerRender(controlDescription);
  gameView.addHandlerRender(controlGame);
  // statsView.addHandlerUpdateTimer(controlTimer);
};
init();
