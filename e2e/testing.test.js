

describe("App.js", () => {
jest.setTimeout(20000);


    beforeAll(async () => {

        await page.goto("http://localhost:3000");
    });

    it("check if we have 4 categories", async () => {
        await page.setDefaultTimeout(20000);
        await page.waitForSelector("#root h2");
        const text = await page.$eval("#root h2", (e) => e.textContent);
        expect(text).toContain("Domowa spiżarnia");
        await page.click(".MuiButton-containedPrimary");
        await page.waitForSelector("#categoryPageLabel");
        await page.waitForSelector(".categoryListItem");
        const categoriesCount = await page.$$eval('.MuiImageListItem-root', (categories) => categories.length);
        expect(categoriesCount).toBe(5);
    });
})