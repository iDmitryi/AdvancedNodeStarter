const puppeteer = require("puppeteer");

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  page = await browser.newPage();

  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await browser.close();
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

test.only("when sign in, shows logout button", async () => {
  const id = "66ae0316a6d51e92d6e4b386";

  const Buffer = require("safe-buffer").Buffer;

  const sessionObject = {
    passport: {
      user: id,
    },
  };

  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    "base64"
  );

  const Keygrip = require("keygrip");
  const keys = require("../config/keys");

  const keygrip = new Keygrip([keys.cookieKey]);

  const sig = keygrip.sign("session=" + sessionString);

  await page.setCookie({ name: "session", value: sessionString });
  await page.setCookie({ name: "session.sig", value: sig });

  // refresh the page to see updated header
  await page.goto("http://localhost:3000");

  await page.waitFor('a[href="/auth/logout"]');

  const text = await page.$eval('a[href="/auth/logout"]', (el) => el.innerHTML);

  expect(text).toEqual("Logout");
});
