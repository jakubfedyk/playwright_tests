import { test, expect } from "@playwright/test";

test.describe("Testy e2e Sklepu", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const siteTitle = await page.locator("a.site-title");
    await expect(siteTitle).toContainText("Generic Shop");
  });
  test("Open most wanted category", async ({ page }) => {
    await page.click('a[title="Most Wanted"]');
    await expect(page).toHaveURL(
      "https://skleptest.pl/product-category/most-wanted/",
    );
  });
  test("Empty login form", async ({ page }) => {
    await page.click(".top-account");
    await page.click('input[name="login"]');
    const errorMessage = await page.locator(".woocommerce-error li");
    await expect(errorMessage).toContainText("Error: Username is required.");
  });

  test("Login form", async ({ page }) => {
    await page.click(".top-account");
    await page.type("#username", "email@example.com", { delay: 500 });
    await page.type("#password", "password", { delay: 500 });
    await page.click('input[name="login"]');
    const errorMessage = await page.locator(".woocommerce-error li");
    await expect(errorMessage).toContainText(
      "Error: A user could not be found with this email address.",
    );
  });

  test("Lost password @pass", async ({ page }) => {
    await page.click(".top-account");
    await page.click("text=Lost your password?");
    const emailInput = await page.locator("#user_login");
    const resetPasswordButton = await page.locator("[value='Reset password']");
    await emailInput.fill("email@example.com");
    await resetPasswordButton.click();
    const errorMessage = await page.locator(".woocommerce-error li");
    await expect(errorMessage).toContainText("Invalid username or email.");
  });

  test("Assercje", async ({ page }) => {
    await expect(page).toHaveTitle("Generic Shop – Just another web shop");
    await expect(page.locator(".site-description")).toBeVisible();
    await expect(page.locator("h1")).not.toBeVisible();
    await expect(page.locator(".site-description")).toHaveText(
      "Just another web shop",
    );
    await expect(page.locator(".site-description")).toHaveCount(1);
    await expect(page.locator(".site-description")).toBeTruthy();
    //await expect(page.locator(".site-description")).toHaveValue("");
  });
});

test.skip("Selektory", async ({ page }) => {
  //tekst
  await page.click("tekst=just another shop");

  //CSS
  await page.click("button");
  await page.click("#id");
  await page.click("class");
  ``;
  //visible
  await page.click("button:visible");
  await page.click("button.submitButton");

  //Xpath
  await page.click("header/div");
  await page.click('//h3[@class="widget-title"]');
});

test.skip("Adnotacje", async ({ page }) => {
  /* 
        .skip() pomija test
        .only() uruchamia tylko ten test
        .fail() Playwright spodziewa sie faila, poinformuje nas jeżeli zdarzy sie cos innego
        .fixme() oznacza test jako failujacy, Playwright sie nim nie przejmuje
        .slow () wydłuża trzykrotnie domyślny timeout
        .describe() grupuje testy
        .parallel() wykonuje testy rownolegle

        Hooki:
        .beforeEach() przed każdym testem
        .beforeAll() przed wszystkimi testami
        .afterEach() po każdym teście
        .afterAll() po wszystkich testach
        */
});
