import { Language } from "./utils/languageConfig";
import { Direction, GridSize, Position } from "./models";

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
