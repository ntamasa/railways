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
      // db x y x y ...
      oasis: [3, 0, 4, 1, 4, 3, 3],
      bridge: [2, 1, 3, 2, 0],
      mountain: [3, 0, 1, 2, 2, 4, 2],
    },
    {
      oasis: [3, 0, 0, 2, 1, 3, 3],
      bridge: [2, 0, 2, 2, 0],
      mountain: [3, 1, 1, 1, 4, 2, 2],
    },
    {
      oasis: [1, 3, 1],
      bridge: [4, 0, 2, 1, 4, 2, 2, 4, 1],
      mountain: [2, 3, 1, 4, 4],
    },
    {
      oasis: [1, 4, 2],
      bridge: [2, 0, 3, 2, 0],
      mountain: [3, 2, 2, 2, 4, 4, 3],
    },
    {
      oasis: [1, 3, 3],
      bridge: [3, 0, 2, 0, 2, 3, 2],
      mountain: [3, 1, 1, 2, 3, 4, 1],
    },
  ],
  hard: [
    {
      oasis: [3, 0, 2, 0, 3, 4, 6],
      bridge: [5, 0, 5, 1, 0, 2, 2, 4, 4, 6, 3],
      mountain: [4, 0, 1, 3, 3, 4, 0, 4, 2],
    },
    {
      oasis: [3, 0, 2, 4, 1, 6, 2],
      bridge: [4, 1, 0, 1, 2, 2, 2, 2, 6],
      mountain: [4, 1, 5, 3, 0, 4, 3, 5, 1],
    },
    {
      oasis: [3, 2, 0, , 4, 1, 6, 2],
      bridge: [4, 0, 2, 1, 6, 4, 4, 5, 0],
      mountain: [4, 2, 2, 4, 2, 5, 5, 6, 3],
    },
    {
      oasis: [1, 3, 3],
      bridge: [4, 1, 3, 3, 1, 3, 5, 5, 0],
      mountain: [5, 1, 5, 2, 2, 4, 2, 4, 4, 5, 5],
    },
    {
      oasis: [1, 4, 4],
      bridge: [3, 2, 1, 2, 2, 5, 3],
      mountain: [4, 1, 5, 2, 4, 4, 2, 5, 1],
    },
  ],
};

export const loadData = function (name, difficulty) {
  state.playerName = name;
  state.difficulty = difficulty;
  state.level = createLevelObject(difficulty);
};

const createLevelObject = function (difficulty) {
  const random = getRandom(0, 5);

  return levels[difficulty][random];
};

export const updatePage = function (newPage) {
  state.page = newPage;
};

export const updateTimer = async function () {
  state.timeElapsed++;
};
