import {
  required,
  greaterThan,
  validInstructions,
  xIsInBounds,
  yIsInBounds,
} from "../validation";
import { language, gridSize } from "../../StateManager";
import { Language } from "../config";

describe("validationUtils", () => {
  it("should validate required fields", () => {
    expect(required("")).toBeDefined();
    expect(required("something")).toBeUndefined();
    expect(required(0)).toBeUndefined();
  });

  it("should validate values greater than a certain number", () => {
    const greaterThan10 = greaterThan(10);
    expect(greaterThan10(11)).toBeUndefined();
    expect(greaterThan10(10)).toBeDefined();
  });

  it("should validate instructions", () => {
    language.current = Language.english;
    expect(validInstructions("frfl")).toBeUndefined();
    expect(validInstructions("invalid")).toBeDefined();
  });

  it("should validate x is in bounds", () => {
    gridSize.current = { columns: 5, rows: 5 };
    expect(xIsInBounds(4)).toBeUndefined();
    expect(xIsInBounds(6)).toBeDefined();
    expect(xIsInBounds(-1)).toBeDefined();
  });

  it("should validate y is in bounds", () => {
    gridSize.current = { columns: 5, rows: 5 };
    expect(yIsInBounds(4)).toBeUndefined();
    expect(yIsInBounds(6)).toBeDefined();
    expect(yIsInBounds(-1)).toBeDefined();
  });
});
