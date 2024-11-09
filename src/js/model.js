import {
  getRandom,
  isValidBottomLeft,
  isValidBottomRight,
  isValidHorizontal,
  isValidTopLeft,
  isValidTopRight,
  isValidVertical,
} from "./helper.js";

export const state = {
  playerName: "",
  page: "menu",
  difficulty: "easy",
  level: {},
  grid: [[]],
  timeElapsed: 0,
  isOver: false,
  timer: undefined,
};

const levels = {
  easy: [
    {
      // db {x, y, rotation} ...
      oasis: [3, { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 3, y: 3 }],
      bridge: [2, { x: 1, y: 3, rotation: 0 }, { x: 2, y: 0, rotation: 0 }],
      mountain: [
        3,
        { x: 0, y: 1, rotation: -270 },
        { x: 2, y: 2, rotation: 180 },
        { x: 4, y: 2, rotation: -90 },
      ],
    },
    {
      oasis: [3, { x: 0, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 3 }],
      bridge: [2, { x: 0, y: 2, rotation: -90 }, { x: 2, y: 0, rotation: 0 }],
      mountain: [
        3,
        { x: 1, y: 1, rotation: 180 },
        { x: 1, y: 4, rotation: 180 },
        { x: 2, y: 2, rotation: -90 },
      ],
    },
    {
      oasis: [1, { x: 3, y: 1 }],
      bridge: [
        4,
        { x: 0, y: 2, rotation: -90 },
        { x: 1, y: 4, rotation: 0 },
        { x: 2, y: 2, rotation: 0 },
        { x: 4, y: 1, rotation: -90 },
      ],
      mountain: [
        2,
        { x: 2, y: 1, rotation: 180 },
        { x: 4, y: 4, rotation: 180 },
      ],
    },
    {
      oasis: [1, { x: 4, y: 2 }],
      bridge: [2, { x: 0, y: 3, rotation: -90 }, { x: 2, y: 0, rotation: 0 }],
      mountain: [
        3,
        { x: 2, y: 2, rotation: -270 },
        { x: 2, y: 4, rotation: -270 },
        { x: 4, y: 3, rotation: -90 },
      ],
    },
    {
      oasis: [1, { x: 3, y: 3 }],
      bridge: [
        3,
        { x: 0, y: 2, rotation: -90 },
        { x: 2, y: 0, rotation: 0 },
        { x: 3, y: 2, rotation: 0 },
      ],
      mountain: [
        3,
        { x: 1, y: 1, rotation: 0 },
        { x: 2, y: 3, rotation: -90 },
        { x: 4, y: 1, rotation: 180 },
      ],
    },
  ],
  hard: [
    {
      oasis: [3, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 4, y: 6 }],
      bridge: [
        5,
        { x: 0, y: 5, rotation: -90 },
        { x: 1, y: 0, rotation: 0 },
        { x: 2, y: 2, rotation: 0 },
        { x: 4, y: 4, rotation: -90 },
        { x: 6, y: 3, rotation: -90 },
      ],
      mountain: [
        4,
        { x: 0, y: 1, rotation: -270 },
        { x: 3, y: 3, rotation: -90 },
        { x: 4, y: 0, rotation: -90 },
        { x: 4, y: 2, rotation: -270 },
      ],
    },
    {
      oasis: [3, { x: 0, y: 2 }, { x: 4, y: 1 }, { x: 6, y: 2 }],
      bridge: [
        4,
        { x: 1, y: 0, rotation: 0 },
        { x: 1, y: 2, rotation: -90 },
        { x: 2, y: 2, rotation: -90 },
        { x: 2, y: 6, rotation: 0 },
      ],
      mountain: [
        4,
        { x: 1, y: 5, rotation: 180 },
        { x: 3, y: 0, rotation: 0 },
        { x: 4, y: 3, rotation: -270 },
        { x: 5, y: 1, rotation: 0 },
      ],
    },
    {
      oasis: [3, { x: 2, y: 0 }, { x: 4, y: 1 }, { x: 6, y: 2 }],
      bridge: [
        4,
        { x: 0, y: 2, rotation: -90 },
        { x: 1, y: 6, rotation: 0 },
        { x: 4, y: 4, rotation: -90 },
        { x: 5, y: 0, rotation: 0 },
      ],
      mountain: [
        4,
        { x: 2, y: 2, rotation: -90 },
        { x: 4, y: 2, rotation: -90 },
        { x: 5, y: 5, rotation: -270 },
        { x: 6, y: 3, rotation: -90 },
      ],
    },
    {
      oasis: [1, { x: 3, y: 3 }],
      bridge: [
        4,
        { x: 1, y: 3, rotation: 0 },
        { x: 3, y: 1, rotation: -90 },
        { x: 3, y: 5, rotation: -90 },
        { x: 5, y: 0, rotation: 0 },
      ],
      mountain: [
        5,
        { x: 1, y: 5, rotation: 180 },
        { x: 2, y: 2, rotation: -90 },
        { x: 4, y: 2, rotation: 180 },
        { x: 4, y: 4, rotation: -270 },
        { x: 5, y: 5, rotation: -90 },
      ],
    },
    {
      oasis: [1, { x: 4, y: 4 }],
      bridge: [
        3,
        { x: 2, y: 1, rotation: -90 },
        { x: 2, y: 2, rotation: -90 },
        { x: 5, y: 3, rotation: 0 },
      ],
      mountain: [
        4,
        { x: 1, y: 5, rotation: 0 },
        { x: 2, y: 4, rotation: -270 },
        { x: 4, y: 2, rotation: 0 },
        { x: 5, y: 1, rotation: -180 },
      ],
    },
  ],
};

export const loadData = function (name, difficulty) {
  state.playerName = name;
  state.difficulty = difficulty;
  state.level = createLevelObject(difficulty);
  state.grid = createGrid(difficulty, state.level);
};

const createGrid = function (difficulty, level) {
  const n = difficulty === "easy" ? 5 : 7;

  const grid = Array.from(Array(n), () => Array(n));

  let numOasis = level.oasis[0];
  const oasisTiles = level.oasis.slice(1);

  let numBridge = level.bridge[0];
  const bridgeTiles = level.bridge.slice(1);

  let numMountain = level.mountain[0];
  const mountainTiles = level.mountain.slice(1);

  // Load grid with empty tiles
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      grid[i][j] = { type: "empty", x: i, y: j };

      // oasis
      if (numOasis) {
        for (const tile of oasisTiles) {
          if (tile.x === i && tile.y === j) {
            grid[i][j] = { type: "oasis", x: i, y: j };
            numOasis--;
          }
        }
      }

      // bridge
      if (numBridge) {
        for (const tile of bridgeTiles) {
          if (tile.x === i && tile.y === j) {
            grid[i][j] = {
              type: "bridge",
              rotation: tile.rotation,
              x: i,
              y: j,
            };
            numBridge--;
          }
        }
      }

      // mountains
      if (numMountain) {
        for (const tile of mountainTiles) {
          if (tile.x === i && tile.y === j) {
            grid[i][j] = {
              type: "mountain",
              rotation: tile.rotation,
              x: i,
              y: j,
            };
            numMountain--;
          }
        }
      }
    }
  }

  return grid;
};

const createLevelObject = function (difficulty) {
  const random = getRandom(0, 4);

  console.log(random);

  return levels[difficulty][random];
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
      console.log(isOver());
      if (isOver()) stopTimer();
    }
  }

  console.log(state.grid);
};

const checkNeighbours = function (tile) {
  const n = state.difficulty === "easy" ? 5 : 7;
  const { x, y } = tile;
  const result = {
    top: undefined,
    right: undefined,
    bottom: undefined,
    left: undefined,
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === x && j === y - 1) result.left = state.grid[i][j];
      if (i === x && j === y + 1) result.right = state.grid[i][j];
      if (j === y && i === x - 1) result.top = state.grid[i][j];
      if (j === y && i === x + 1) result.bottom = state.grid[i][j];
    }
  }
  console.log(result);
  return result;
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

  console.log("elotte");
  if (!checkAllFieldsUsed()) return;
  console.log("utanna");

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // Every rail containing tile connect to each other correctly (no dead ends, has a circle)
      // if (state.grid[i][j] === startTile) continue;
      console.log("sdzsi");
      const tile = state.grid[i][j];
      const neighbours = checkNeighbours(tile);
      const isCurved =
        tile.type === "curved_rail" || tile.type === "mountain_rail";

      console.log(tile);
      // straight/bridge rotation:0
      // prettier-ignore
      if ((tile.type === "straight_rail" || tile.type === "bridge_rail") && (tile.rotation === 0)) {
        if (!isValidVertical(neighbours)) {
          console.log("1")
          return false
        }
      }

      // straight rotation:-90
      // prettier-ignore
      if ((tile.type === "straight_rail" || tile.type === "bridge_rail") && (tile.rotation === -90)) {
        if (!isValidHorizontal(neighbours)) {
          console.log("2")
          return false;
        }
      }

      // curved/mountain rotation:0
      // prettier-ignore
      if (isCurved && tile.rotation === 0) {
        if (!isValidBottomRight(neighbours)) {
          console.log("3")
          return false;
        }
      }

      // curved/mountain rotation:-90
      // prettier-ignore
      if (isCurved && tile.rotation === -90){
        if (!isValidTopRight(neighbours)) {
          console.log("4")
          return false;
        }
      }

      // curved/mountain rotation:180
      // prettier-ignore
      if (isCurved && tile.rotation === 180) {
        if (!isValidTopLeft(neighbours)) {
          console.log("5")
          return false
        }
      }

      // curved/mountain rotation:-270
      // prettier-ignore
      if (isCurved && tile.rotation === -270) {
        if (!isValidBottomLeft(neighbours)) {
          console.log("6")
          return false
        }
      }
    }
  }
  return true;
};

export const calcEnd = function () {
  state.isOver = true;
};

const checkAllFieldsUsed = function () {
  const n = state.difficulty === "easy" ? 5 : 7;
  let isAllUsed = true;

  console.log(state.grid);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // 2, Every non-oasis tile has XY_rail type
      if (
        state.grid[i][j].type !== "oasis" &&
        !state.grid[i][j].type.includes("rail")
      )
        isAllUsed = false;
    }
  }
  return isAllUsed;
};
