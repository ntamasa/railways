import { getRandom } from "./helper.js";

export const state = {
  playerName: "",
  page: "menu",
  difficulty: "easy",
  level: {},
  grid: [[]],
  timeElapsed: 1,
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
      grid[i][j] = { type: "empty" };

      // oasis
      if (numOasis) {
        for (const tile of oasisTiles) {
          if (tile.x === i && tile.y === j) {
            grid[i][j] = { type: "oasis" };
            numOasis--;
          }
        }
      }

      // bridge
      if (numBridge) {
        for (const tile of bridgeTiles) {
          if (tile.x === i && tile.y === j) {
            grid[i][j] = { type: "bridge", rotation: tile.rotation };
            numBridge--;
          }
        }
      }

      // mountains
      if (numMountain) {
        for (const tile of mountainTiles) {
          if (tile.x === i && tile.y === j) {
            grid[i][j] = { type: "mountain", rotation: tile.rotation };
            numMountain--;
          }
        }
      }
    }
  }

  console.log(grid);

  return grid;
};

const createLevelObject = function (difficulty) {
  const random = getRandom(0, 4);

  console.log(random);

  return levels[difficulty][random];
};

export const updateGrid = function (changedCell) {
  console.log("model vagyok");
  console.log(changedCell);
  if (!changedCell) return;

  const n = state.difficulty === "easy" ? 5 : 7;
  const { x, y, rotation, content } = changedCell;
  const type = content.split("/")[4].split(".")[0];
  console.log(type);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (x === i && y === j) {
        console.log("changed");
        state.grid[i][j] = { type, rotation };
      }
    }
  }
  console.log(state.grid);
};

export const checkNeighBours = function (cell) {
  const n = state.difficulty === "easy" ? 5 : 7;
  const [x, y] = cell.dataset.coord.split("-").map(Number);
  const result = { top: "", right: "", bottom: "", left: "" };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === x && j - 1 === y) result.right = state.grid[i][j];
      if (i === x && j + 1 === y) result.left = state.grid[i][j];
      if (j === y && i - 1 === x) result.bottom = state.grid[i][j];
      if (j === y && i + 1 === x) result.top = state.grid[i][j];
    }
  }
  console.log(result);
  return result;
};

export const updatePage = function (newPage) {
  state.page = newPage;
};

export const updateTimer = async function () {
  state.timeElapsed++;
};

export const getLevel = function () {
  return this.state.level;
};
