import { Direction, GridSize, Position } from "../models";
import { Instruction } from "../models";

// to add a new language, add a new value to the enum and a new object to the languageTranslations object
export enum Language {
  english = "English",
  swedish = "Swedish",
}

const languageTranslations = {
  [Language.english]: {
    Right: Instruction.Right,
    Left: Instruction.Left,
    Forward: Instruction.Forward,
    validation: Instruction.Right + Instruction.Left + Instruction.Forward,
  },
  [Language.swedish]: {
    Right: "H",
    Left: "V",
    Forward: "G",
    validation: "HVG",
  },
};

export const initialValues: {
  startingPosition: Position;
  startingDirection: Direction;
  gridSize: GridSize;
  instructions: string;
  language: Language;
} = {
  startingPosition: { x: 1, y: 3 },
  startingDirection: Direction.north,
  gridSize: { columns: 10, rows: 10 },
  instructions: "frffrffflffffrfrffrfffrf",
  language: Language.english,
};

export { languageTranslations };
