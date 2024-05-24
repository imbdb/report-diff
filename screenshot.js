const puppeteer = require('puppeteer');

async function screenshot(url, imagePath){
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: imagePath, fullPage: true });
    await browser.close();
}

module.exports = {screenshot};