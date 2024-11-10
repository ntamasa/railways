import { levels } from "./levels.js";

export const getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const checkAllFieldsUsed = function (state) {
  const n = state.difficulty === "easy" ? 5 : 7;
  let isAllUsed = true;

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

export const checkNeighbours = function (tile, state) {
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
  return result;
};

export const createGrid = function (difficulty, level) {
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

export const createLevelObject = function (difficulty) {
  const random = getRandom(0, 4);

  return levels[difficulty][random];
};

// straight rotation: 0 rail can be placed
export const isValidVertical = function (neighbour) {
  const { top, right, bottom, left } = neighbour;

  // if top tile is bad
  // prettier-ignore
  if (top?.type === "oasis" || ((top?.type === "straight_rail" || top?.type === "bridge_rail") && top?.rotation === -90)) return false;

  // if bottom tile is bad
  // prettier-ignore
  if (bottom?.type === "oasis" || ((bottom?.type === "straight_rail" || bottom?.type === "bridge_rail") && bottom?.rotation === -90)) return false;

  // if left tile is straight and
  if (
    (left?.type === "straight_rail" || left?.type === "bridge_rail") &&
    left?.rotation === -90
  )
    return false;
  // if right tile is straight and
  if (
    (right?.type === "straight_rail" || right?.type === "bridge_rail") &&
    right?.rotation === -90
  )
    return false;

  // if left tile is curved and
  if (
    (left?.type === "curve_rail" ||
      left?.type === "mountain" ||
      left?.type === "mountain_rail") &&
    (left?.rotation === 0 || left?.rotation === -90)
  )
    return false;

  // if right tile is curved and
  if (
    (right?.type === "curve_rail" ||
      right?.type === "mountain" ||
      right?.type === "mountain_rail") &&
    (right?.rotation === 180 || right?.rotation === -270)
  )
    return false;

  return true;
};

// straight rotation: 90deg rail can be placed
export const isValidHorizontal = function (neighbour) {
  const { top, right, bottom, left } = neighbour;

  // if left tile is bad
  // prettier-ignore
  if (left?.type === "oasis" || ((left?.type === "straight_rail" || left?.type === "bridge_rail") && left?.rotation === 0) || ((left?.type === "curved_rail" || left?.type === "mountain_rail") && (left?.rotation === 180 || left?.rotation === -270))) return false;

  // if right tile is bad
  // prettier-ignore
  if (right?.type === "oasis" || ((right?.type === "straight_rail" || right?.type === "bridge_rail") && right?.rotation === 0) || ((right?.type === "curved_rail" || right?.type === "mountain_rail") && (right?.rotation === 0 || right?.rotation === -90))) return false;

  // if top tile is straight and
  if (
    (top?.type === "straight_rail" || top?.type === "bridge_rail") &&
    top?.rotation === 0
  )
    return false;

  // if bottom tile is straight and
  if (
    (bottom?.type === "straight_rail" ||
      bottom?.type === "bridge_rail" ||
      bottom?.type === "bridge") &&
    bottom?.rotation === 0
  )
    return false;

  // if top tile is curved and
  if (
    (top?.type === "curve_rail" ||
      top?.type === "mountain" ||
      top?.type === "mountain_rail") &&
    (top?.rotation === 0 || left?.rotation === -270)
  )
    return false;

  // if bottom tile is curved and
  if (
    (bottom?.type === "curve_rail" ||
      bottom?.type === "mountain" ||
      bottom?.type === "mountain_rail") &&
    (bottom?.rotation === -90 || bottom?.rotation === 180)
  )
    return false;

  return true;
};

// top to left rail can be placed
export const isValidTopLeft = function (neighbour) {
  const { top, right, bottom, left } = neighbour;

  // Nothing can connect from bottom and right
  if (
    (right?.type === "straight_rail" || right?.type === "bridge_rail") &&
    right?.rotation === -90
  )
    return false;
  if (
    (bottom?.type === "straight_rail" || bottom?.type === "bridge_rail") &&
    bottom?.rotation === 0
  )
    return false;
  if (
    (right?.type === "curve_rail" || right?.type === "mountain_rail") &&
    (right?.rotation === 180 || right?.rotation === -270)
  )
    return false;
  if (
    (bottom?.type === "curve_rail" || bottom?.type === "mountain_rail") &&
    (bottom?.rotation === -90 || bottom?.rotation === 180)
  )
    return false;

  // if tile is bad from top
  if (
    (top?.type === "straight_rail" || top?.type === "bridge_rail") &&
    top?.rotation === -90
  )
    return false;
  if (
    (top?.type === "curve_rail" || top?.type === "mountain_rail") &&
    (top?.rotation === -90 || top?.rotation === 180)
  )
    return false;

  // if tile is bad from left
  if (
    (left?.type === "straight_rail" || left?.type === "bridge_rail") &&
    left?.rotation === 0
  )
    return false;
  if (
    (left?.type === "curve_rail" || left?.type === "mountain_rail") &&
    (left?.rotation === 180 || left?.rotation === -270)
  )
    return false;
  return true;
};

// top to right rail can be placed
export const isValidTopRight = function (neighbour) {
  const { top, right, bottom, left } = neighbour;

  // Nothing can connect from bottom and left
  if (
    (left?.type === "straight_rail" || left?.type === "bridge_rail") &&
    left?.rotation === -90
  )
    return false;
  if (
    (bottom?.type === "straight_rail" || bottom?.type === "bridge_rail") &&
    bottom?.rotation === 0
  )
    return false;
  if (
    (left?.type === "curve_rail" || left?.type === "mountain_rail") &&
    (left?.rotation === 0 || left?.rotation === -90)
  )
    return false;
  if (
    (bottom?.type === "curve_rail" || bottom?.type === "mountain_rail") &&
    (bottom?.rotation === -90 || bottom?.rotation === 180)
  )
    return false;

  // if tile is bad from top
  if (
    (top?.type === "straight_rail" || top?.type === "bridge_rail") &&
    top?.rotation === -90
  )
    return false;
  if (
    (top?.type === "curve_rail" || top?.type === "mountain_rail") &&
    (top?.rotation === -90 || top?.rotation === 180)
  )
    return false;

  // if tile is bad from right
  if (
    (right?.type === "straight_rail" || right?.type === "bridge_rail") &&
    right?.rotation === 0
  )
    return false;
  if (
    (right?.type === "curve_rail" || right?.type === "mountain_rail") &&
    (right?.rotation === 0 || right?.rotation === -90)
  )
    return false;
  return true;
};

// bottom to right rail can be placed
export const isValidBottomRight = function (neighbour) {
  const { top, right, bottom, left } = neighbour;

  // Nothing can connect from top and left
  if (
    (left?.type === "straight_rail" || left?.type === "bridge_rail") &&
    left?.rotation === -90
  )
    return false;
  if (
    (top?.type === "straight_rail" || top?.type === "bridge_rail") &&
    top?.rotation === 0
  )
    return false;
  if (
    (left?.type === "curve_rail" || left?.type === "mountain_rail") &&
    (left?.rotation === 0 || left?.rotation === -90)
  )
    return false;
  if (
    (top?.type === "curve_rail" || top?.type === "mountain_rail") &&
    (top?.rotation === 0 || top?.rotation === -270)
  )
    return false;

  // if tile is bad from bottom
  if (
    (bottom?.type === "straight_rail" || bottom?.type === "bridge_rail") &&
    bottom?.rotation === -90
  )
    return false;
  if (
    (bottom?.type === "curve_rail" || bottom?.type === "mountain_rail") &&
    (bottom?.rotation === 0 || bottom?.rotation === -270)
  )
    return false;

  // if tile is bad from right
  if (
    (right?.type === "straight_rail" || right?.type === "bridge_rail") &&
    right?.rotation === 0
  )
    return false;
  if (
    (right?.type === "curve_rail" || right?.type === "mountain_rail") &&
    (right?.rotation === 0 || right?.rotation === -90)
  )
    return false;
  return true;
};

// bottom to left rail can be placed
export const isValidBottomLeft = function (neighbour) {
  const { top, right, bottom, left } = neighbour;

  // Nothing can connect from top and right
  if (
    (right?.type === "straight_rail" || right?.type === "bridge_rail") &&
    right?.rotation === -90
  )
    return false;
  if (
    (top?.type === "straight_rail" || top?.type === "bridge_rail") &&
    top?.rotation === 0
  )
    return false;
  if (
    (right?.type === "curve_rail" || right?.type === "mountain_rail") &&
    (right?.rotation === 180 || right?.rotation === -270)
  )
    return false;
  if (
    (top?.type === "curve_rail" || top?.type === "mountain_rail") &&
    (top?.rotation === 0 || top?.rotation === -270)
  )
    return false;

  // if tile is bad from bottom
  if (
    (bottom?.type === "straight_rail" || bottom?.type === "bridge_rail") &&
    bottom?.rotation === -90
  )
    return false;
  if (
    (bottom?.type === "curve_rail" || bottom?.type === "mountain_rail") &&
    (bottom?.rotation === 0 || bottom?.rotation === -270)
  )
    return false;

  // if tile is bad from left
  if (
    (left?.type === "straight_rail" || left?.type === "bridge_rail") &&
    left?.rotation === 0
  )
    return false;
  if (
    (left?.type === "curve_rail" || left?.type === "mountain_rail") &&
    (left?.rotation === 180 || left?.rotation === -270)
  )
    return false;
  return true;
};
