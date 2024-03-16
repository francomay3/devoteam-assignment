import { languageTranslations } from "./languageConfig";
import { language, gridSize } from "../StateManager";

export const required = (value: string | number) =>
  value === "" ? "Required" : undefined;
export const greaterThan = (least: number) => (value: number) =>
  value > least ? undefined : `Must be greater than ${least}`;
export const validInstructions = (value: string) => {
  let validInstructions = languageTranslations[language.current].validation;
  validInstructions += validInstructions.toLowerCase();
  const regex = new RegExp(`^[${validInstructions}]+$`);
  return regex.test(value) ? undefined : "Invalid instructions";
};
export const xIsInBounds = (x: number) => {
  if (x >= gridSize.current.columns || x < 0) {
    return "X is out of bounds";
  }
};
export const yIsInBounds = (y: number) => {
  if (y >= gridSize.current.rows || y < 0) {
    return "Y is out of bounds";
  }
};
