export const getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + max);
};
