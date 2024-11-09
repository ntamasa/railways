export const getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// straight rotation: 0 rail can be placed
export const isVertical = function (neighbour) {
  const { top, right, bottom, left } = neighbour;

  // if top/bottom tile is oasis
  if (top.type === "oasis" || bottom.type === "oasis") return false;

  // if left tile is straight and ...
  if (
    (left.type === "straight_rail" ||
      left.type === "bridge_rail" ||
      left.type === "bridge") &&
    left?.rotation === -90
  )
    return false;

  // if left tile is curved and ...
  if (
    (left.type === "curve_rail" ||
      left.type === "mountain" ||
      left.type === "mountain_rail") &&
    (left?.rotation === 0 || left?.rotation === -90)
  )
    return false;

  // if right tile is straight and ...
  if (
    (right.type === "straight_rail" ||
      right.type === "bridge_rail" ||
      right.type === "bridge") &&
    right?.rotation === -90
  )
    return false;

  // if right tile is curved and ...
  if (
    (right.type === "curve_rail" ||
      right.type === "mountain" ||
      right.type === "mountain_rail") &&
    (right?.rotation === 180 || right?.rotation === -270)
  )
    return false;

  return true;
};

// straight rotation: 90deg rail can be placed
export const isHorizontal = function (neighbour) {
  const { top, right, bottom, left } = neighbour;

  // if left/right tile is oasis
  if (left.type === "oasis" || right.type === "oasis") return false;

  // if top tile is straight and ...
  if (
    (top.type === "straight_rail" ||
      top.type === "bridge_rail" ||
      top.type === "bridge") &&
    top?.rotation === 0
  )
    return false;

  // if top tile is curved and ...
  if (
    (top.type === "curve_rail" ||
      top.type === "mountain" ||
      top.type === "mountain_rail") &&
    (top?.rotation === 0 || left?.rotation === -270)
  )
    return false;

  // if bottom tile is straight and ...
  if (
    (bottom.type === "straight_rail" ||
      bottom.type === "bridge_rail" ||
      bottom.type === "bridge") &&
    bottom?.rotation === 0
  )
    return false;

  // if bottom tile is curved and ...
  if (
    (bottom.type === "curve_rail" ||
      bottom.type === "mountain" ||
      bottom.type === "mountain_rail") &&
    (bottom?.rotation === -90 || bottom?.rotation === 180)
  )
    return false;

  return true;
};

// top to left rail can be placed
export const isTopLeft = function (neighbour) {
  const { top, right, bottom, left } = neighbour;

  // Nothing can connect from bottom and right
  if (
    (right.type === "straight_rail" ||
      right.type === "bridge_rail" ||
      right.type === "bridge") &&
    right?.rotation === -90
  )
    return false;
  if (
    (bottom.type === "straight_rail" ||
      bottom.type === "bridge_rail" ||
      bottom.type === "bridge") &&
    bottom?.rotation === 0
  )
    return false;
  if (
    (right.type === "curve_rail" ||
      right.type === "mountain_rail" ||
      right.type === "mountain") &&
    (right?.rotation === 180 || right?.rotation === -270)
  )
    return false;
  if (
    (bottom.type === "curve_rail" ||
      bottom.type === "mountain_rail" ||
      bottom.type === "mountain") &&
    (bottom?.rotation === -90 || bottom?.rotation === 180)
  )
    return false;

  // if tile is bad from top
  if (
    (top.type === "straight_rail" ||
      top.type === "bridge_rail" ||
      top.type === "bridge") &&
    top?.rotation === -90
  )
    return false;
  if (
    (top.type === "curve_rail" ||
      top.type === "mountain_rail" ||
      top.type === "mountain") &&
    (top?.rotation === -90 || top?.rotation === 180)
  )
    return false;

  // if tile is bad from left
  if (
    (left.type === "straight_rail" ||
      left.type === "bridge_rail" ||
      left.type === "bridge") &&
    left?.rotation === 0
  )
    return false;
  if (
    (left.type === "curve_rail" ||
      left.type === "mountain_rail" ||
      left.type === "mountain") &&
    (left?.rotation === 180 || left?.rotation === -270)
  )
    return false;
  return true;
};

// top to right rail can be placed
export const isTopRight = function (neighbour) {
  const { top, right, bottom, left } = neighbour;

  // Nothing can connect from bottom and left
  if (
    (left.type === "straight_rail" ||
      left.type === "bridge_rail" ||
      left.type === "bridge") &&
    left?.rotation === -90
  )
    return false;
  if (
    (bottom.type === "straight_rail" ||
      bottom.type === "bridge_rail" ||
      bottom.type === "bridge") &&
    bottom?.rotation === 0
  )
    return false;
  if (
    (left.type === "curve_rail" ||
      left.type === "mountain_rail" ||
      left.type === "mountain") &&
    (left?.rotation === 0 || right?.rotation === -90)
  )
    return false;
  if (
    (bottom.type === "curve_rail" ||
      bottom.type === "mountain_rail" ||
      bottom.type === "mountain") &&
    (bottom?.rotation === -90 || bottom?.rotation === 180)
  )
    return false;

  // if tile is bad from top
  if (
    (top.type === "straight_rail" ||
      top.type === "bridge_rail" ||
      top.type === "bridge") &&
    top?.rotation === -90
  )
    return false;
  if (
    (top.type === "curve_rail" ||
      top.type === "mountain_rail" ||
      top.type === "mountain") &&
    (top?.rotation === -90 || top?.rotation === 180)
  )
    return false;

  // if tile is bad from right
  if (
    (right.type === "straight_rail" ||
      right.type === "bridge_rail" ||
      right.type === "bridge") &&
    right?.rotation === 0
  )
    return false;
  if (
    (right.type === "curve_rail" ||
      right.type === "mountain_rail" ||
      right.type === "mountain") &&
    (right?.rotation === 0 || right?.rotation === -90)
  )
    return false;
  return true;
};

// bottom to right rail can be placed
export const isBottomRight = function (neighbour) {
  const { top, right, bottom, left } = neighbour;

  // Nothing can connect from top and left
  if (
    (left.type === "straight_rail" ||
      left.type === "bridge_rail" ||
      left.type === "bridge") &&
    left?.rotation === -90
  )
    return false;
  if (
    (top.type === "straight_rail" ||
      top.type === "bridge_rail" ||
      top.type === "bridge") &&
    top?.rotation === 0
  )
    return false;
  if (
    (left.type === "curve_rail" ||
      left.type === "mountain_rail" ||
      left.type === "mountain") &&
    (left?.rotation === 0 || left?.rotation === -90)
  )
    return false;
  if (
    (top.type === "curve_rail" ||
      top.type === "mountain_rail" ||
      top.type === "mountain") &&
    (top?.rotation === 0 || top?.rotation === -270)
  )
    return false;

  // if tile is bad from bottom
  if (
    (bottom.type === "straight_rail" ||
      bottom.type === "bridge_rail" ||
      bottom.type === "bridge") &&
    bottom?.rotation === -90
  )
    return false;
  if (
    (bottom.type === "curve_rail" ||
      bottom.type === "mountain_rail" ||
      bottom.type === "mountain") &&
    (bottom?.rotation === 0 || bottom?.rotation === -270)
  )
    return false;

  // if tile is bad from right
  if (
    (right.type === "straight_rail" ||
      right.type === "bridge_rail" ||
      right.type === "bridge") &&
    right?.rotation === 0
  )
    return false;
  if (
    (right.type === "curve_rail" ||
      right.type === "mountain_rail" ||
      right.type === "mountain") &&
    (right?.rotation === 0 || right?.rotation === -90)
  )
    return false;
  return true;
};

// bottom to left rail can be placed
export const isBottomLeft = function (neighbour) {
  const { top, right, bottom, left } = neighbour;

  // Nothing can connect from top and right
  if (
    (right.type === "straight_rail" ||
      right.type === "bridge_rail" ||
      right.type === "bridge") &&
    right?.rotation === 0
  )
    return false;
  if (
    (top.type === "straight_rail" ||
      top.type === "bridge_rail" ||
      top.type === "bridge") &&
    top?.rotation === 0
  )
    return false;
  if (
    (right.type === "curve_rail" ||
      right.type === "mountain_rail" ||
      right.type === "mountain") &&
    (right?.rotation === 180 || right?.rotation === -270)
  )
    return false;
  if (
    (top.type === "curve_rail" ||
      top.type === "mountain_rail" ||
      top.type === "mountain") &&
    (top?.rotation === 0 || top?.rotation === -270)
  )
    return false;

  // if tile is bad from bottom
  if (
    (bottom.type === "straight_rail" ||
      bottom.type === "bridge_rail" ||
      bottom.type === "bridge") &&
    bottom?.rotation === -90
  )
    return false;
  if (
    (bottom.type === "curve_rail" ||
      bottom.type === "mountain_rail" ||
      bottom.type === "mountain") &&
    (bottom?.rotation === 0 || bottom?.rotation === -270)
  )
    return false;

  // if tile is bad from left
  if (
    (left.type === "straight_rail" ||
      left.type === "bridge_rail" ||
      left.type === "bridge") &&
    left?.rotation === 0
  )
    return false;
  if (
    (left.type === "curve_rail" ||
      left.type === "mountain_rail" ||
      left.type === "mountain") &&
    (left?.rotation === 180 || left?.rotation === -270)
  )
    return false;
  return true;
};

export const getAngle = function (element) {
  const style = window.getComputedStyle(element);
  const transform = style.getPropertyValue("transform");

  // If there's no transform style applied, the rotation is 0 degrees
  if (transform === "none") return 0;

  // Extract the matrix values
  const values = transform.match(/matrix.*\((.+)\)/)[1].split(", ");
  const a = values[0];
  const b = values[1];

  // Calculate the angle in degrees
  const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  return angle < 0 ? angle + 360 : angle; // Ensure angle is in [0, 360] range
};
