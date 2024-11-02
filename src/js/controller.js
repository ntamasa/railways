import * as model from "./model.js";
import descriptionView from "./views/descriptionView.js";

const controlDescription = function (newPage) {
  model.updatePage(newPage);

  descriptionView.render(model.state.page);
};

const init = function () {
  descriptionView.addHandlerRender(controlDescription);
};
init();
