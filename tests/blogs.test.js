const Page = require("./helpers/page");

let page;
beforeEach(async () => {
  page = await Page.build();

  await page.getContentsOf("http://localhost:3000");
});

afterEach(async () => {
  await page.close;
});

test("when logged in, can se blog create form", async () => {
  await page.login();

  await page.click("a.btn-floating");

  const label = page.getContentsOf("form label");

  expect(label).toEqual("Blog Labels");
});
