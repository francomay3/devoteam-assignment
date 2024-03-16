export type Position = {
  x: number;
  y: number;
};

export enum Direction {
  north = "N",
  east = "Ö",
  south = "S",
  west = "V",
}

export enum Instruction {
  Right = "R",
  Left = "L",
  Forward = "F",
}

export type Instructions = Instruction[];

export type GridState = {
  position: Position;
  direction: Direction;
  gridSize: {
    columns: number;
    rows: number;
  };
};

export type GridSize = { columns: number; rows: number };
