import "./style.css";
import { Language } from "./utils/config";
import {
  startingPosition,
  language,
  instructions,
  gridSize,
} from "./StateManager";
import "./components/index";
import { Grid } from "./components/Grid";
import { initialValues } from "./utils/config";
import {
  greaterThan,
  required,
  validInstructions,
  xIsInBounds,
  yIsInBounds,
} from "./utils/validation";
import getResult from "./utils/getResult";

const appElement = document.querySelector<HTMLDivElement>("#app");

if (!appElement) {
  throw new Error("Couldn't find app element");
}

appElement.innerHTML = /*html*/ `
  <div id="config-container">

    <custom-input type="number" id="x" initial-value="${
      startingPosition.current.x
    }" label="Start X"></custom-input>

    <custom-input type="number" id="y" initial-value="${
      startingPosition.current.y
    }" label="Start Y"></custom-input>

    <custom-input type="number" id="columns" initial-value="${
      initialValues.gridSize.columns
    }" label="Columns" min="1"></custom-input>

    <custom-input type="number" id="rows" initial-value="${
      initialValues.gridSize.rows
    }" label="Rows" min="1"></custom-input>

    <select-input id="language" label="Language" options="${Object.values(
      Language
    ).join(",")}" initial-value="${Language.english}"></select-input>

    <custom-input id="instructions" label="Instructions" initial-value="${
      instructions.current
    }"></custom-input>

    <div class="divider"></div>

    <span class="resultSpan">Result: 
      <span id="result-value">-</span>
    </span>

  </div>

  <grid-component id="grid"></grid-component>
  `;

const startingXInput = document.getElementById("x") as CustomInput;
const startingYInput = document.getElementById("y") as CustomInput;
const columnsInput = document.getElementById("columns") as CustomInput;
const rowsInput = document.getElementById("rows") as CustomInput;
const langInput = document.getElementById("language") as SelectInput;
const instructionsInput = document.getElementById(
  "instructions"
) as CustomInput;
const grid = document.getElementById("grid") as Grid;

startingXInput.validators(required, xIsInBounds);
startingYInput.validators(required, yIsInBounds);
columnsInput.validators(required, greaterThan(0));
rowsInput.validators(required, greaterThan(0));
instructionsInput.validators(required, validInstructions);

startingXInput.onChange((value: number) => {
  startingPosition.set({ x: value, y: startingPosition.current.y });
});

startingYInput.onChange((value: number) => {
  startingPosition.set({ x: startingPosition.current.x, y: value });
});

columnsInput.onChange((value: number) => {
  gridSize.set({ columns: value, rows: gridSize.current.rows });
});

rowsInput.onChange((value: number) => {
  if (value < 1) {
    return;
  }
  gridSize.set({ columns: gridSize.current.columns, rows: value });
});

langInput.onChange((value: string) => {
  language.set(value as Language);
});

instructionsInput.onChange((value: string) => {
  instructions.set(value.toUpperCase());
});

const onStateChange = () => {
  grid.update({
    startingPosition: startingPosition.current,
    startingDirection: initialValues.startingDirection,
    gridSize: gridSize.current,
    instructions: instructions.current,
    language: language.current,
  });
  [
    startingXInput,
    startingYInput,
    columnsInput,
    rowsInput,
    instructionsInput,
  ].forEach((input) => {
    input.validate();
  });
  const result = getResult(
    startingPosition.current,
    instructions.current,
    language.current
  );
  document.getElementById("result-value")!.innerText = result
    ? `${result.position.x} ${result.position.y} ${result.direction}`
    : "-";
};

[startingPosition, instructions, language, gridSize].forEach((state) => {
  state.subscribe(onStateChange);
});

onStateChange();
