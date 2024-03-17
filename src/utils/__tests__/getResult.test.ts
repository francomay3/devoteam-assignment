import getResult from "../getResult";
import { Direction, Position } from "../../models";
import { Language } from "../config";

describe("getResult", () => {
  test("getResult returns expected value", () => {
    const startingPosition: Position = { x: 0, y: 0 };
    const instructions: string = "FFRFF";
    const language: Language = Language.english;
    const result = getResult(startingPosition, instructions, language);

    const expected = {
      position: { x: 2, y: -2 },
      direction: Direction.east,
      path: [
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: -2 },
        { x: 0, y: -2 },
        { x: 1, y: -2 },
        { x: 2, y: -2 },
      ],
    };

    expect(result).toStrictEqual(expected);
  });

  test("can handle swedish instructions", () => {
    const startingPosition: Position = { x: 0, y: 0 };
    const instructions: string = "gghgg";
    const language: Language = Language.swedish;
    const result = getResult(startingPosition, instructions, language);

    const expected = {
      position: { x: 2, y: -2 },
      direction: Direction.east,
      path: [
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: -2 },
        { x: 0, y: -2 },
        { x: 1, y: -2 },
        { x: 2, y: -2 },
      ],
    };

    expect(result).toStrictEqual(expected);
  });

  test("returns null if instructions are invalid", () => {
    const startingPosition: Position = { x: 0, y: 0 };
    const instructions: string = "not-valid";
    const language: Language = Language.english;
    const result = getResult(startingPosition, instructions, language);

    expect(result).toStrictEqual(null);
  });
});
