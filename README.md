# Devoteam Assignment

This is a TypeScript project that uses Vite for building and serving the application, Jest for unit testing, and Playwright for end-to-end testing.

## Project Structure

- `src/`: Contains the source code of the application.
  - `components/`: Contains the custom web components used in the application.
  - `utils/`: Contains utility functions and configurations.
- `playwright/`: Contains the Playwright tests.

## Installation and run the application

```sh
npm install
npm run dev
```

## Tests

```sh
npm run test # to run unit tests
npm run playwright # to run E2E tests
```

## Using the app

The interface has a panel with inputs and a grid component. the imputs are to set the initial position, the size of the grid, the language and the instructions. <br>
On input, the whole app state is refreshed and you can see on the grid where the robot was at start, where it ended in the end and the path it took over the grid.
Also you can thee the resulting coordinates and orientation under the inputs.

## About the code

- T his project has 0 dependencies.
- Custom state manager that keeps the app synchronized
- javascript web components
- input field validation
- configurable initial values
- Adding a new language is a breeze
- A representation of the grid in a square shape with visual feedback for the initial position of the robot, its final position and the path it took to get there.

---

### Thank you for your time!
