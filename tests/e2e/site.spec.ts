import { test, expect } from "@playwright/test";
test("Home renders, controls work and layout fits the viewport", async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "INFRASTRUCTURE",
  );
  await expect(page.locator(".hero-image img")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  if (process.env.GENERATE_PREVIEWS) {
    await page.screenshot({
      path: `docs/previews/home-${isMobile ? "mobile" : "desktop"}.png`,
    });
  }
  await page.getByRole("tab", { name: /Cages/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Precision in every connection.",
  );
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Close menu" }).click();
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});
test("Catalogue filters by category and supports empty searches", async ({
  page,
}) => {
  await page.goto("/mart");
  await page.getByRole("button", { name: "Cages", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page
    .getByRole("searchbox", { name: "Search equipment" })
    .fill("impossible item");
  await expect(page.getByText("Let’s find what you need.")).toBeVisible();
});
test("Consultation can choose a preview slot and produce an explicitly unsent enquiry", async ({
  page,
}) => {
  await page.goto("/consultation");
  await expect(
    page.getByText("Calendar preview", { exact: true }),
  ).toBeVisible();
  const dates = page.locator(".calendar-grid button.available");
  if ((await dates.count()) === 0)
    await page.getByRole("button", { name: "Next month" }).click();
  await dates.first().click();
  await page.locator(".time-slots button").first().click();
  await page.getByRole("button", { name: "Your details" }).click();
  await page.getByLabel(/Full name/).fill("Preview Test");
  await page.getByLabel(/Email address/).fill("preview@example.com");
  await page
    .getByLabel(/Tell us what/)
    .fill(
      "Please discuss a commercial poultry house and feeding requirements.",
    );
  await page.locator('input[name="consent"]').check();
  await page
    .getByRole("button", { name: "Prepare enquiry", exact: true })
    .click();
  await expect(
    page.getByText("Nothing has been sent or booked.", { exact: false }),
  ).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download your enquiry" }).click();
  expect((await download).suggestedFilename()).toBe(
    "dekoraj-project-enquiry.json",
  );
});
test("Invalid enquiries are rejected and unknown routes show a real 404", async ({
  request,
}) => {
  const result = await request.post("/api/enquiries", {
    data: { name: "Missing requirements" },
  });
  expect(result.status()).toBe(400);
  expect((await request.get("/mart/unknown-item")).status()).toBe(404);
});
