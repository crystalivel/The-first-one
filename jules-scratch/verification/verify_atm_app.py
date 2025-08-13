import asyncio
from playwright.async_api import async_playwright, expect
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.goto('http://localhost:3000/')

        await expect(page.locator('#login-btn')).to_be_enabled()
        await page.fill('#account-id', 'ACC1001')
        await page.fill('#pin', '1234')
        await page.click('#login-btn')

        await expect(page.locator('#main-menu-screen')).to_be_visible()

        # Initial balance check
        await page.click('#check-balance-btn')
        await expect(page.locator('#content-display')).to_contain_text('$1500')

        # Test Deposit
        await page.click('#deposit-btn')
        await expect(page.locator('#modal')).to_be_visible()
        await page.fill('#modal-input', '500')
        await page.click('#modal-submit-btn')
        await expect(page.locator('#modal')).to_be_hidden()
        await page.click('#check-balance-btn')
        await expect(page.locator('#content-display')).to_contain_text('$2000')

        # Reload the page to check persistence
        await page.reload()

        # Log in again
        await expect(page.locator('#login-btn')).to_be_enabled()
        await page.fill('#account-id', 'ACC1001')
        await page.fill('#pin', '1234')
        await page.click('#login-btn')

        # Check if the balance is updated after reload
        await page.click('#check-balance-btn')
        await expect(page.locator('#content-display')).to_contain_text('$2000')

        await page.screenshot(path='jules-scratch/verification/persistence-check.png')

        # Restore original balance for next test run
        await page.click('#withdraw-btn')
        await expect(page.locator('#modal')).to_be_visible()
        await page.fill('#modal-input', '500')
        await page.click('#modal-submit-btn')

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
