import {
  Position,
  Direction,
  Instruction,
  Instructions,
  GridState,
} from "../models";
import { Language, languageTranslations } from "./config";

const directions = [
  Direction.north,
  Direction.east,
  Direction.south,
  Direction.west,
];

type GetResult = (
  startingPosition: Position,
  instructions: string,
  language: Language
) => GridState | null;

const translateInstruction =
  (arr: { Right: string; Left: string; Forward: string }) =>
  (instruction: string): Instruction | null => {
    // check if all instructions are valid
    if (!Object.values(arr).includes(instruction)) {
      return null;
    }
    if (instruction === arr.Right) return Instruction.Right;
    if (instruction === arr.Left) return Instruction.Left;
    if (instruction === arr.Forward) return Instruction.Forward;
    return null;
  };

const translateInstructions = (
  input: string,
  language: Language
): Instructions | null => {
  const upperInput = input
    .toUpperCase()
    .split("")
    .map(translateInstruction(languageTranslations[language]));

  if (upperInput.includes(null)) {
    return null;
  }
  return upperInput as Instructions;
};

const getResult: GetResult = (startingPosition, input, language) => {
  const translatedInstructions = translateInstructions(input, language);

  if (!translatedInstructions) {
    return null;
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
      path: [{ x: startingPosition.x, y: startingPosition.y }],
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
