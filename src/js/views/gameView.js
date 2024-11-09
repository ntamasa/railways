import { getAngle } from "../helper.js";
import View from "./view.js";

class GameView extends View {
  _parentElement = document.querySelector("main");
  _errorMessage = "Enter a name!";

  _btn = document.querySelector(".start");

  _generateMarkup() {
    return `<table class="game-board">
        ${this._data
          .map(
            (row, i) => `<tr>
              ${row
                .map(
                  (col, j) =>
                    `<td class="tile-item" data-coord="${i}-${j}" ${
                      row.length === 7 ? 'style="max-width: 11rem"' : ""
                    } ${
                      col?.rotation
                        ? `style="transform: rotate(${col?.rotation}deg)"`
                        : ""
                    }><img src="./src/pics/tiles/${col.type}.png"  /></td>`
                )
                .join("")}
            </tr>`
          )
          .join("")}
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

  addHandlerTileEvent(handler, isOver, grid) {
    let isEnded = false;
    const cells = document.querySelectorAll(".tile-item");

    const tiles = [
      "straight_rail",
      "straight_rail",
      "curve_rail",
      "curve_rail",
      "curve_rail",
      "curve_rail",
      "empty",
    ];

    let newContent = ``;
    const usedCells = [];
    const enterDirection = {};

    cells.forEach((cell) => {
      // if oasis
      if (
        cell.children[0].src.split("/").slice(-1).join().split(".")[0] ===
        "oasis"
      )
        return;

      cell.addEventListener("click", (e) => {
        const tileType = cell.children[0].src
          .split("/")
          .slice(-1)
          .join()
          .split(".")[0];
        // Get current rotation
        const angle = getAngle(cell);
        console.log(angle);
        let newAngle = 0;

        const [x, y] = e.target.dataset.coord.split("-").map(Number);

        // if mountain / bridge
        if (tileType === "mountain" || tileType === "bridge") {
          newContent = `<img src="./src/pics/tiles/${tileType}_rail.png"/>`;
          handler({
            x,
            y,
            rotation: grid[x][y].rotation,
            content: newContent,
          });
        }

        // used mountain / bridge
        if (tileType === "mountain_rail" || tileType === "bridge_rail") return;

        // Click any other field
        if (
          tileType === "curve_rail" ||
          tileType === "straight_rail" ||
          tileType === "empty"
        ) {
          const img = cell.children[0];
          const counter =
            img?.dataset.count >= 0 && img?.dataset.count < 6
              ? +img.dataset.count + 1
              : 0;
          if (counter === 0) newAngle = 0;
          if (counter === 1) newAngle = -90;
          if (counter === 2) newAngle = 0;
          if (counter === 3) newAngle = -90;
          if (counter === 4) newAngle = 180;
          if (counter === 5) newAngle = -270;
          if (counter === 6) newAngle = 0;

          cell.style.transform = `rotate(${newAngle}deg)`;

          newContent = `<img src="./src/pics/tiles/${tiles[counter]}.png" data-count="${counter}"/>`;
        }

        cell.innerHTML = newContent;
        usedCells.push(cell);
        handler({
          x,
          y,
          rotation: newAngle,
          content: newContent,
        });
        isEnded = isOver() ? true : isEnded;
        console.log(isEnded);
      });
    });
    console.log(isEnded);
    return isEnded;
  }
}

export default new GameView();
