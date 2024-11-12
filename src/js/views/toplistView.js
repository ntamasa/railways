import View from "./view.js";

class TopListView extends View {
  _parentElement = document.querySelector(".toplist-content");

  _btn = document.querySelector(".toggle-toplist");

  addHandlerRender(handler) {
    handler();
  }

  toggleOpen() {
    const el = document.querySelector(".toplist-content");
    this._btn.addEventListener("click", function (e) {
      if (el.dataset.toplist === "false") {
        el.dataset.toplist = true;
        return;
      }
      if (el.dataset.toplist) {
        el.dataset.toplist = false;
        return;
      }
    });
  }

  _generateMarkup() {
    return `
      <h2 class="toplist-heading">Toplista</h2>
      <ol class="toplist-list">
      ${this._data
        .map(
          (player) => `<div>
              <li class="toplist-list-item">
              <p class="toplist-name">${player.playerName}</p>
              <p class="toplist-time">${
                Math.floor(player.timeElapsed / 60) < 10
                  ? `0${Math.floor(player.timeElapsed / 60)}`
                  : Math.floor(player.timeElapsed / 60)
              }:${
            Math.floor(player.timeElapsed % 60) < 10
              ? `0${Math.floor(player.timeElapsed % 60)}`
              : Math.floor(player.timeElapsed % 60)
          }</p>
          <p class="toplist-difficulty">${player.difficulty}</p>
                  </li>
                  </div>`
        )
        .join()}
                </ol>
        `;
  }
}

export default new TopListView();
