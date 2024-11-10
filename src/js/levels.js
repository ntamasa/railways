export const levels = {
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
