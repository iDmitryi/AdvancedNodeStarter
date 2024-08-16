const Page = require("./helpers/page");

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});

test("the header has the correct text", async () => {
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

test("when sign in, shows logout button", async () => {
  await page.login();

  const text = await page.$eval('a[href="/auth/logout"]', (el) => el.innerHTML);

  expect(text).toEqual("Logout");
});
