export const state = {
  difficulty: "",
  level: 1,
  grid: [[]],
  page: "menu",
  playerName: "",
};

export const updatePage = function (newPage) {
  state.page = newPage;
};
