"use strict";
const puppeteer = require('./node_modules/puppeteer');
(async () => {
    const t = new Date(Date.now());
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 375,
            height: 667
        },
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    browser.defaultBrowserContext().overridePermissions('https://myddc.usx.edu.cn', ['geolocation']);
    page.setGeolocation({
        latitude: 27.834000,
        longitude: 120.74800000
    });
    await page.goto('https://ca.usx.edu.cn/cas/login?service=https%3A%2F%2Fmyddc.usx.edu.cn%2Fwebroot%2Fdecision%2Fview%2Fform%3Fop%3Dh5%26viewlet%3Dxxkj%252Fmobile%252Fbpa%252Fbpa.frm#/form');
    await page.type('#username', '21539133', {
        delay: 100
    });
    await page.type('#password', 'Zsj12345', {
        delay: 100
    });
    await page.click('#fm1 > button');
    await Promise.all([page.waitForNavigation()]);
    await page.waitForSelector('#BT_CLICK > div:nth-child(2) > div:nth-child(2) > div');
    if (!await page.$('#app > div > div.css-1dbjc4n.r-105ug2t > div:nth-child(1) > div > div > div:nth-child(2) > div')) {
        await page.click('#WCN > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div > div > div > div:nth-child(1)');
        await page.waitForSelector('#BT_CLICK > div:nth-child(2) > div:nth-child(2) > div[data-focusable = true]');
        await page.click('#BT_CLICK > div:nth-child(2) > div:nth-child(2) > div');
        await Promise.all([page.waitForNavigation()]);
        await page.waitForSelector('#col_0_row_0 > div > div > img');
        await page.screenshot({
            path: 'bpa' + t.getFullYear() + (t.getMonth() + 1) + t.getDate() + '.png',
            fullPage: true
        });
    }
    await page.waitForTimeout(6000);
    await browser.close();
})();