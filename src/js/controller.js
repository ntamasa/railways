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
    // 1, Get data from input fields
    // could throw an error
    const name = gameView.getName();
    const difficulty = gameView.getDifficulty();
    console.log(`name: ${name}`);
    console.log(`difficulty: ${difficulty}`);

    // 2, Load all data to state object
    model.loadData(name, difficulty);
    model.updatePage(newPage);

    console.log(model.state);

    // 3, Render game page
    gameView.render(model.state);
    statsView.render(model.state);

    //
    // TODO show state update of timer in the DOM
    setInterval(async () => {
      model.updateTimer();
      statsView.render(model.state);
    }, 1000);
  } catch (err) {
    console.log(err.message);
    gameView.renderError();
  }
};

const init = function () {
  descriptionView.addHandlerRender(controlDescription);
  gameView.addHandlerRender(controlGame);
};
init();
