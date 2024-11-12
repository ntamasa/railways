import {
  checkAllFieldsUsed,
  checkNeighbours,
  createGrid,
  createLevelObject,
  getRandom,
  isValidBottomLeft,
  isValidBottomRight,
  isValidHorizontal,
  isValidTopLeft,
  isValidTopRight,
  isValidVertical,
} from "./helper.js";
import toplistView from "./views/toplistView.js";

export const state = {
  playerName: "",
  page: "menu",
  difficulty: "easy",
  level: {},
  grid: [[]],
  timeElapsed: 0,
  isOver: false,
  timer: undefined,
  toplist: [],
};

export const loadData = function (name, difficulty) {
  state.playerName = name;
  state.difficulty = difficulty;
  state.level = createLevelObject(difficulty);
  state.grid = createGrid(difficulty, state.level);
  state.toplist = getSavedToplist();
};

export const updateGrid = function (changedCell) {
  if (!changedCell) return;

  const n = state.difficulty === "easy" ? 5 : 7;
  const { x, y, rotation, content } = changedCell;
  const type = content.split("/")[4].split(".")[0];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (x === i && y === j)
        if (
          state.grid[i][j].type === "mountain_rail" ||
          state.grid[i][j].type === "bridge_rail"
        ) {
          state.grid[i][j].type = type;
        } else {
          state.grid[i][j] = {
            type,
            rotation,
            x,
            y,
          };
        }
    }
  }
  if (isOver()) {
    stopTimer();
    updateToplist(state.playerName, state.timeElapsed, state.difficulty);
    saveToplist();
    toplistView.render(state.toplist);
  }
};

export const updatePage = function (newPage) {
  state.page = newPage;
};

export const startTimer = function () {
  if (state.timer) return;

  state.timer = setInterval(() => {
    state.timeElapsed++;
  }, 1000);
};

export const stopTimer = function () {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
};

export const getLevel = function () {
  return this.state.level;
};

export const isOver = function () {
  const n = state.difficulty === "easy" ? 5 : 7;

  const startTile = state.grid[0][0];
  const lastTile = startTile;

  if (!checkAllFieldsUsed(state)) return;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // Every rail containing tile connect to each other correctly (no dead ends, has a circle)
      const tile = state.grid[i][j];
      const neighbours = checkNeighbours(tile, state);
      const isCurved =
        tile.type === "curved_rail" || tile.type === "mountain_rail";

      // straight/bridge rotation:0
      // prettier-ignore
      if ((tile.type === "straight_rail" || tile.type === "bridge_rail") && (tile.rotation === 0)) {
        if (!isValidVertical(neighbours))
          return false

      }

      // straight rotation:-90
      // prettier-ignore
      if ((tile.type === "straight_rail" || tile.type === "bridge_rail") && (tile.rotation === -90)) {
        if (!isValidHorizontal(neighbours))
          return false;

      }

      // curved/mountain rotation:0
      // prettier-ignore
      if (isCurved && tile.rotation === 0) {
        if (!isValidBottomRight(neighbours))
          return false;

      }

      // curved/mountain rotation:-90
      // prettier-ignore
      if (isCurved && tile.rotation === -90){
        if (!isValidTopRight(neighbours))
          return false;

      }

      // curved/mountain rotation:180
      // prettier-ignore
      if (isCurved && tile.rotation === 180) {
        if (!isValidTopLeft(neighbours))
          return false

      }

      // curved/mountain rotation:-270
      // prettier-ignore
      if (isCurved && tile.rotation === -270) {
        if (!isValidBottomLeft(neighbours))
          return false
      }
    }
  }
  state.isOver = true;
  return true;
};

const saveToplist = function () {
  localStorage.removeItem("toplist");
  localStorage.setItem("toplist", JSON.stringify(state.toplist));
};

const getSavedToplist = function () {
  if (!localStorage.getItem("toplist")) return [];
  return JSON.parse(localStorage.getItem("toplist"));
};

const updateToplist = function (name, time, difficulty) {
  const newToplist = state.toplist;
  const newItem = {
    playerName: name,
    timeElapsed: time,
    difficulty,
  };
  newToplist.push(newItem);
  newToplist.sort((a, b) => a.timeElapsed - b.timeElapsed);
  state.toplist = newToplist;
};
