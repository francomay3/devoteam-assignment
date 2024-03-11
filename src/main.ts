import "./style.css";
import getResult from "./getResult";
import { Position } from "./models";
import { Language } from "./languageConfig";
import Grid from "./Grid";

const appElement = document.querySelector<HTMLDivElement>("#app");

const grid = new Grid();
const configContainer = document.createElement("div");
configContainer.id = "config-container";

const button = document.createElement("button");
button.textContent = "Get Result";
button.onclick = () => {
  const input = document.querySelector<HTMLInputElement>("#input");
  const result = document.querySelector<HTMLDivElement>("#result");
  const xInput = document.querySelector<HTMLInputElement>("#x");
  const yInput = document.querySelector<HTMLInputElement>("#y");
  const languageSelect = document.querySelector<HTMLSelectElement>("#language");

  if (input && result && xInput && yInput && languageSelect) {
    const startingPosition: Position = {
      x: parseInt(xInput.value),
      y: parseInt(yInput.value),
    };

    const resultValue = getResult(
      startingPosition,
      input.value,
      languageSelect.value as Language
    );
    grid.update(resultValue);
    result.textContent = JSON.stringify(resultValue);
  }
};

const input = document.createElement("input");
input.id = "input";
input.placeholder = "Enter prompt";

const xInput = document.createElement("input");
xInput.type = "number";
xInput.id = "x";
xInput.placeholder = "Enter x coordinate";

const yInput = document.createElement("input");
yInput.type = "number";
yInput.id = "y";
yInput.placeholder = "Enter y coordinate";

const languageSelect = document.createElement("select");
languageSelect.id = "language";
Object.values(Language).forEach((language) => {
  const option = document.createElement("option");
  option.value = language;
  option.textContent = language;
  languageSelect.appendChild(option);
});

const result = document.createElement("div");
result.id = "result";

configContainer.appendChild(input);
configContainer.appendChild(xInput);
configContainer.appendChild(yInput);
configContainer.appendChild(languageSelect);
configContainer.appendChild(button);
configContainer.appendChild(result);

if (appElement) {
  appElement.appendChild(configContainer);
  appElement.appendChild(grid.container);
}
