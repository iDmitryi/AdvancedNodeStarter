const puppeteer = require("puppeteer");

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });

  page = await browser.newPage();

  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await browser.close();
});

test("wthe header has the correct text", async () => {
  // #root > div > div > nav > div > a
  const text = await page.$eval("a.brand-logo", (el) => el.innerHTML);

  expect(text).toEqual("Blogster");
});

test("clicking login start oauth flow", async () => {
  await page.click(".right a");

  // https://accounts.google.com
  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});
