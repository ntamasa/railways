import {
  getAngle,
  isBottomLeft,
  isBottomRight,
  isHorizontal,
  isTopLeft,
  isTopRight,
  isVertical,
} from "../helper.js";
import View from "./view.js";

class GameView extends View {
  _parentElement = document.querySelector("main");
  _errorMessage = "Enter a name!";

  _btn = document.querySelector(".start");

  _generateMarkup() {
    console.log(this._data);
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

  // TODO method for checking if game is over
  isOver() {}

  addHandlerTileEvent(handler) {
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
      const tileType = cell.children[0].src
        .split("/")
        .slice(-1)
        .join()
        .split(".")[0];

      // if oasis
      if (tileType === "oasis") return;

      cell.addEventListener("click", (e) => {
        // Get current rotation
        const angle = getAngle(cell);

        const newAngle = angle + 90 === 360 ? 0 : angle + 90;
        const [x, y] = e.target.dataset.coord.split("-").map(Number);

        if (tileType === "mountain_rail" || tileType === "bridge_rail") return;

        // if mountain
        if (tileType === "mountain")
          newContent = `<img src="./src/pics/tiles/mountain_rail.png"/>`;

        // if bridge
        if (tileType === "bridge")
          newContent = `<img src="./src/pics/tiles/bridge_rail.png"/>`;

        // Click any other field
        if (tileType !== "mountain" && tileType !== "bridge") {
          const img = cell.children[0];
          const counter =
            img?.dataset.count && img?.dataset.count < 6
              ? +img.dataset.count + 1
              : 0;
          if (counter === 1 || (counter >= 3 && counter <= 5))
            cell.style.transform = `rotate(${newAngle}deg)`;

          newContent = `<img src="./src/pics/tiles/${tiles[counter]}.png" data-count="${counter}"/>`;
        }

        cell.innerHTML = newContent;
        usedCells.push(cell);
        handler({
          x,
          y,
          rotation: 0,
          content: newContent,
        });
      });
    });
  }

  _handleMouseDown(e) {
    // 1, Check if already used
    if (usedCells.filter((usedCell) => usedCell === cell)) {
      isDragging = false;
      return;
    }

    // 2, Start dragging
    isDragging = true;

    // 3, Store enter direction

    // first tile
    enterDirection[cell.dataset.coord] = "initial";
  }

  _handleMouseEnter(e) {
    // 1, Check if dragging
    if (!isDragging) return;

    const { x, y } = e.target.dataset.coord.split("-").map(Number);
    const { lastX, lastY } = usedCells
      .slice(-1)
      .dataset.coord.split("-")
      .map(Number);

    // 2, Check if the move way diagonal
    if (Math.abs(lastX - x) + Math.abs(lastY - y) !== 1) {
      isDragging = false;
      // Reset current drag
      return;
    }

    // 3, Store newly entered cell and enter direction
    if (x === lastX) {
      if (y < lastY) enterDirection[cell.dataset.coord] = "down";
      if (y > lastY) enterDirection[cell.dataset.coord] = "up";
    }
    if (y == lastY) {
      if (x < lastX) enterDirection[cell.dataset.coord] = "right";
      if (x > lastX) enterDirection[cell.dataset.coord] = "left";
    }

    usedCell.append(cell);
  }
}

export default new GameView();
