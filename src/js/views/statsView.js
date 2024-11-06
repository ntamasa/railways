import View from "./view.js";

class StatsView extends View {
  _parentElement = document.querySelector("header");

  _generateMarkup() {
    const { playerName, timeElapsed } = this._data;

    return `<h1>Railways</h1>
    <div class="game-info">
        <div class="info-item">
          <h2 class="info-item__heading">Útvonaltervező:</h2>
          <p class="info-item__content">${playerName}</p>
        </div>

        <hr />

        <div class="info-item">
          <h2 class="info-item__heading">Eltelt idő:</h2>
          <p class="info-item__content">${
            Math.floor(timeElapsed / 60) < 10
              ? "0" + Math.floor(timeElapsed / 60)
              : Math.floor(timeElapsed / 60)
          }:${
      timeElapsed % 60 < 10 ? "0" + (timeElapsed % 60) : timeElapsed % 60
    }</p>
        </div>
      </div>`;
  }
}

export default new StatsView();
