import { Language } from "./utils/languageConfig";
import { Direction, GridSize, Position } from "./models";

export const initialValues: {
  startingPosition: Position;
  startingDirection: Direction;
  gridSize: GridSize;
  instructions: string;
  language: Language;
} = {
  startingPosition: { x: 0, y: 0 },
  startingDirection: Direction.north,
  gridSize: { columns: 10, rows: 10 },
  instructions: "rffrf",
  language: Language.english,
};
