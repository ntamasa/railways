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
    gameView.addHandlerTileEvent(
      model.updateGrid,
      model.isOver,
      model.state.grid
    );
  } catch (err) {
    // TODO write renderError
    gameView.renderError();
    console.error(err.message);
  }
};

const init = function () {
  descriptionView.addHandlerRender(controlDescription);
  gameView.addHandlerRender(controlGame);
};
init();
