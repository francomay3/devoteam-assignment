import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  async function elementHasClass(selector, className) {
    const hasClass = await page.$eval(
      selector,
      (element, className) => element.classList.contains(className),
      className
    );
    return hasClass;
  }

  await page.goto("http://localhost:5173/");

  const xInput = await page.$("#x-input");
  const yInput = await page.$("#y-input");
  const columnsInput = await page.$("#columns-input");
  const rowsInput = await page.$("#rows-input");
  const languageSelect = await page.$("#language-select");
  const instructions = await page.$("#instructions");
  const result = await page.$("#result-value");
  const xComponent = await page.$("#x");
  const yComponent = await page.$("#y");

  [
    xInput,
    yInput,
    columnsInput,
    rowsInput,
    languageSelect,
    instructions,
    result,
    xComponent,
    yComponent,
  ].forEach(async (element) => {
    await expect(element).not.toBeNull();
  });

  await expect(page.getByText("6 3 Ö")).toBeVisible();
  await xInput.fill("6");
  await expect(page.getByText("11 3 Ö")).toBeVisible();
  await yInput.fill("5");
  await expect(page.getByText("11 5 Ö")).toBeVisible();
  await columnsInput.fill("6");
  await expect(page.getByText("X is out of bounds")).toBeVisible();
  await yInput.fill("-1");
  await expect(page.getByText("Y is out of bounds")).toBeVisible();
  await columnsInput.fill("8");

  expect(await elementHasClass("#x .error", "active")).toBeFalsy();

  page.pause();
});
