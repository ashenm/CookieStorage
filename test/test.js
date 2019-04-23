/**
 * CookieStorage
 * A Minimalist Pollyfill for Web Storage Store Interface
 * https://github.com/ashenm/CookieStorage
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

const path = require('path');
const puppeteer = require('puppeteer');
const assert = require('assert').strict;

puppeteer.launch({ args: ['--no-sandbox'] }).then(async browser => {

  try {

    const page = await browser.newPage();

    await page.goto('https://ashenm.github.io/blank/5');
    await page.addScriptTag({ path: path.resolve(process.argv[2]) });

    assert.ok(await page.evaluate('window.cookieStore = window.CookieStorage()'));

    assert.ok(await page.evaluate('window.cookieStore.setItem("empty")'));
    assert.ok(await page.evaluate('window.cookieStore.setItem("timestamp", +(new Date()))'));
    assert.ok(await page.evaluate('window.cookieStore.setItem("assessment", "assessment")'));

    assert.ok(await page.evaluate('typeof window.cookieStore.getItem("timestamp") === "string"'));
    assert.ok(await page.evaluate('typeof +(window.cookieStore.getItem("timestamp")) === "number"'));
    assert.ok(await page.evaluate('window.cookieStore.getItem("assessment") === "assessment"'));
    assert.ok(await page.evaluate('window.cookieStore.getItem("debug") === undefined'));
    assert.ok(await page.evaluate('window.cookieStore.getItem("empty") === ""'));

    assert.ok(await page.evaluate('window.cookieStore.removeItem("timestamp")'));
    assert.ok(await page.evaluate('window.cookieStore.getItem("timestamp") === undefined'));
    assert.ok(await page.evaluate('window.cookieStore.getItem("assessment") === "assessment"'));

    assert.ok(await page.evaluate('window.cookieStore.clear()'));
    assert.ok(await page.evaluate('document.cookie === ""'));

    await browser.close();

    process.exit(0);

  } catch (e) {

    console.error(e);
    process.exit(1);

  }

});
