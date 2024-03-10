import "./style.css";

const appElement = document.querySelector<HTMLDivElement>("#app");

// prompts can have only  letters with values r f l
type Prompt = string;

function isValidPrompt(prompt: Prompt): boolean {
  return /^[rflRFL]*$/.test(prompt);
}

// starting position can have x and y coordinates and a direction
type StartingPosition = {
  x: number;
  y: number;
};

const getResult = (startingPosition: StartingPosition, prompt: Prompt) => {
  if (!isValidPrompt(prompt)) {
    return "Invalid prompt";
  }

  let x = startingPosition.x;
  let y = startingPosition.y;
  let directions = ["N", "E", "S", "W"];
  let directionIndex = 0;
  let promptArray = prompt.split("");
  promptArray.forEach((instruction) => {
    switch (instruction) {
      case "r":
        directionIndex += 1;
        if (directionIndex > 3) {
          directionIndex = 0;
        }
        break;
      case "l":
        directionIndex -= 1;
        if (directionIndex < 0) {
          directionIndex = 3;
        }
        break;
      case "f":
        switch (directions[directionIndex]) {
          case "N":
            y -= 1;
            break;
          case "E":
            x += 1;
            break;
          case "S":
            y += 1;
            break;
          case "W":
            x -= 1;
            break;
        }
        break;
    }
  });
  return `(${x},${y},${directions[directionIndex]})`;
};

const button = document.createElement("button");
button.textContent = "Get Result";
button.onclick = () => {
  const input = document.querySelector<HTMLInputElement>("#input");
  const result = document.querySelector<HTMLDivElement>("#result");
  const xInput = document.querySelector<HTMLInputElement>("#x");
  const yInput = document.querySelector<HTMLInputElement>("#y");
  if (input && result && xInput && yInput) {
    const startingPosition: StartingPosition = {
      x: parseInt(xInput.value),
      y: parseInt(yInput.value),
    };
    result.textContent = getResult(startingPosition, input.value);
  }
};

const input = document.createElement("input");
input.id = "input";
input.placeholder = "Enter prompt";

const xInput = document.createElement("input");
xInput.id = "x";
xInput.placeholder = "Enter x coordinate";

const yInput = document.createElement("input");
yInput.id = "y";
yInput.placeholder = "Enter y coordinate";

const result = document.createElement("div");
result.id = "result";

const container = document.createElement("div");
container.appendChild(input);
container.appendChild(xInput);
container.appendChild(yInput);
container.appendChild(button);
container.appendChild(result);

if (appElement) {
  appElement.appendChild(container);
}
