# RAILWAYS

This project is a puzzle game developed as part of the Web Programming course at Eötvös Loránd University (ELTE). The game is built using plain HTML, CSS, and JavaScript, without any external frameworks. The goal of the game is for players to place elements on a grid-based board following specific rules to complete a path or puzzle.

## Project Overview

In this game, players are presented with a grid-based puzzle where they need to place various elements, such as bridges, mountains, and oases, on specific tiles. The puzzle is solved when all tiles are correctly filled according to the game rules, and a path is formed that follows the required layout. Players can choose from different difficulty levels, and their progress is tracked with a timer.

The game includes a leaderboard feature, saving the fastest times for each difficulty. Additionally, players can save their game progress and return to it later.

## Features

### Main Menu

- The game starts with a main menu where players can enter their name and select the difficulty level.
- A start button begins the game, transitioning the player to the game board screen.
- The rules of the game can be accessed from the main menu to help players understand the gameplay mechanics.

### Game Board

- The game board displays the player’s name, a timer to track how long they take to complete the puzzle, and a randomly selected puzzle based on the chosen difficulty.
- Players can place elements like bridges, mountains, and oases onto the grid. These elements must be placed according to specific rules:
  - Bridges can only be placed in a straight line.
  - Mountains must be placed at 90° angles.
  - Oases cannot have elements placed on them.
  - Players can place any element on empty tiles.

### Game Validation

- The game checks if the player has correctly solved the puzzle by verifying that:
  - All cells are touched exactly once.
  - The path forms a continuous loop.
  - All tiles contain the correct elements.
  - All movement between adjacent tiles is possible.

### Leaderboard

- At the end of the game, the player’s time is displayed, and a leaderboard is shown with the fastest completion times for each difficulty level.

### Bonus Features

- **Save Game State**: Players can save their progress during the game. Upon reloading the page, they can continue from where they left off.
- **Leaderboard Persistence**: The leaderboard is saved in the browser’s LocalStorage, so the top scores persist across page reloads.
- **Drag-to-Place Elements**: Elements can be placed on the grid by dragging them with the mouse, providing a more interactive and intuitive gameplay experience.

## Installation

To run the game locally, follow these steps:

```bash
1. Clone the repository:
   git clone https://github.com/your-username/game-project.git
```

```bash
2. Open the `index.html` file in your web browser to start playing the game.
```

No server setup is required, as this is a purely static web project.

## Gameplay Instructions

1. **Start the Game**: Enter your name, choose a difficulty level, and click the "Start" button to begin playing.
2. **Play the Game**: Place elements on the grid by following the rules. The goal is to create a valid path that loops back to its starting point while correctly placing each element on the grid.
3. **Finish the Game**: Once you’ve completed the puzzle, your time will be displayed. Check the leaderboard to see how your time compares to other players.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Please ensure your contributions follow the project's coding standards and include relevant tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
