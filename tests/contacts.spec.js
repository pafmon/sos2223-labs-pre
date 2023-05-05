// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('localhost:12345');

  await expect(page).toHaveTitle(/Contacts Manager/);
});

test('get contacts link', async ({ page }) => {
    await page.goto('localhost:12345');

  await page.getByRole('link', { name: 'Contacts' }).click();

  await expect(page).toHaveTitle(/Contacts List/);

  let items =  (await page.locator('.contactItem').all()).length;

  expect(items).toBeGreaterThan(0);


  // Expects the URL to contain intro.

});
