import View from "./view.js";

class GameView extends View {
  _parentElement = document.querySelector("main");
  _errorMessage = "Enter a name!";

  _btn = document.querySelector(".start");

  _generateMarkup() {
    return this._data.difficutly === "easy"
      ? `<table class="game-board">
<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
      </table>`
      : `<table class="game-board">
<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
          </table>`;
  }

  getName() {
    const name = this._parentElement.querySelector(".menu__playerName").value;

    if (!name) throw new Error();

    this._clearInput();
    return name.toLowerCase();
  }

  getDifficulty() {
    const arr = [];

    this._parentElement
      .querySelectorAll(".difficulty-item")
      .forEach((item) => arr.push(item));

    return arr.filter((radio) => radio.checked)[0].value;
  }

  _clearInput() {
    this._parentElement.querySelector(".menu__playerName").value = "";
  }

  addHandlerRender(handler) {
    this._btn.addEventListener("click", (e) => {
      e.preventDefault();

      if (!this._parentElement.querySelector(".menu__playerName").value) {
        handler("menu");
        return;
      }

      this._parentElement.dataset.show = "game";
      document.querySelector("body").dataset.type = "column";

      const newPage = this._parentElement.dataset.show;

      handler(newPage);
    });
  }

  addHandler(handler) {
    handler();
  }
}

export default new GameView();
