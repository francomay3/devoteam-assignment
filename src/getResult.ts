import { languageTranslations } from "./utils/languageConfig";
import {
  Position,
  Direction,
  Instruction,
  Instructions,
  GridState,
} from "./models";
import { Language } from "./utils/languageConfig";

const directions = [
  Direction.north,
  Direction.east,
  Direction.south,
  Direction.west,
];

const isValidInstruction = (instruction: string): instruction is Instruction =>
  Object.values(Instruction).includes(instruction as Instruction);

type GetResult = (
  startingPosition: Position,
  instructions: string,
  language: Language
) => GridState;

const translateInstruction =
  (arr: { Right: string; Left: string; Forward: string }) =>
  (instruction: string): Instruction => {
    switch (instruction) {
      case arr.Right:
        return Instruction.Right;
      case arr.Left:
        return Instruction.Left;
      case arr.Forward:
        return Instruction.Forward;
      default:
        throw new Error("Invalid instruction");
    }
  };

const translateInstructions = (
  input: string,
  language: Language
): Instructions => {
  const upperInput = input.toUpperCase();

  return upperInput
    .split("")
    .map(translateInstruction(languageTranslations[language]));
};

const getResult: GetResult = (startingPosition, input, language) => {
  const translatedInstructions = translateInstructions(input, language);

  if (!translatedInstructions.every(isValidInstruction)) {
    throw new Error("Invalid instruction");
  }

  const result = translatedInstructions.reduce(
    (acc, instruction) => {
      switch (instruction) {
        case Instruction.Right:
          acc.directionIndex = (acc.directionIndex + 1) % 4;
          break;
        case Instruction.Left:
          acc.directionIndex = (acc.directionIndex + 3) % 4;
          break;
        case Instruction.Forward:
          switch (directions[acc.directionIndex]) {
            case Direction.north:
              acc.y -= 1;
              break;
            case Direction.east:
              acc.x += 1;
              break;
            case Direction.south:
              acc.y += 1;
              break;
            case Direction.west:
              acc.x -= 1;
              break;
          }
          break;
      }
      acc.path.push({ x: acc.x, y: acc.y });
      return acc;
    },
    {
      directionIndex: 0,
      x: startingPosition.x,
      y: startingPosition.y,
      path: [],
    } as {
      directionIndex: number;
      x: number;
      y: number;
      path: Position[];
    }
  );
  return {
    position: { x: result.x, y: result.y },
    direction: directions[result.directionIndex],
    path: result.path,
  };
};

export default getResult;
