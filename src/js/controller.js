import * as model from "./model.js";
import descriptionView from "./views/descriptionView.js";

const controlDescription = function (newPage) {
  model.updatePage(newPage);
  console.log(model.state.page);
  descriptionView.render(model.state.page, true);
};

const init = function () {
  descriptionView.addHandlerRender(controlDescription);
};
init();
