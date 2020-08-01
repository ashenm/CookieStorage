/**
 * CookieStorage
 * A Minimalist Pollyfill for Web Storage Store Interface
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

const fs = require('fs');
const puppeteer = require('puppeteer');

puppeteer.launch({ args: ['--no-sandbox'] }).then(async browser => {

  try {

    const page = await browser.newPage();

    await page.goto('https://ashenm.github.io/blank/5');

    await page.$eval('title', e => {
      e.innerText = 'CookieStorage.js';
    });

    await page.$eval('head', e => {

      const styles = document.createElement('style');

      styles.innerHTML =
        'body { margin: auto; max-width: 83.333333vw; } ' +
        'header { margin-top: 2.5rem; margin-bottom: 1.75rem; } ' +
        '@media (min-width: 992px) { body { max-width: 63.333333vw; } } ' +
        '@media (min-width: 1200px) { body { max-width: 50vw; } }'
      ;

      e.appendChild(styles);

    });

    await page.$eval('body', (e, a, b) => {

      e.innerHTML =
        '<header>' +
          '<h1 style="margin-bottom: 0;">CookieStorage.js</h1>' +
          '<hr >' +
          '<img width="92" height="20" style="margin-right: .5rem;" src="https://img.shields.io/badge/version-latest-44cc11.svg" alt="build version" />' +
          '<img width="90" height="20" src="https://travis-ci.com/ashenm/CookieStorage.svg?branch=master" alt="build status" />' +
        '</header>' +
        '<main>' +
          '<pre>' +
            '<code class="html">' +
              '&lt;script src="https://ashenm.github.io/CookieStorage/CookieStorage.js" integrity="sha384-' + a.trim() + '" crossorigin="anonymous"&gt;&lt;&sol;script&gt;' +
            '</code>' +
          '</pre>' +
          '<pre>' +
            '<code class="html">' +
              '&lt;script src="https://ashenm.github.io/CookieStorage/CookieStorage.min.js" integrity="sha384-' + b.trim() + '" crossorigin="anonymous"&gt;&lt;&sol;script>' +
            '</code>' +
          '</pre>' +
        '</main>' +
        '<footer>' +
        '</footer>'
      ;

    }, fs.readFileSync('build/CookieStorage.js.sha384', { encoding: 'utf-8' }), fs.readFileSync('build/CookieStorage.min.js.sha384', { encoding: 'utf-8' }));

    await page.addStyleTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/github.min.css' });
    await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js' });

    await page.$$eval('pre code', elements => elements.forEach(element => hljs.highlightBlock(element)));
    await page.$$eval('script', elements => elements.forEach(element => element.remove()));

    fs.writeFileSync('build/index.html', await page.content(), { mode: 0o600 });

    await browser.close();

    process.exit(0);

  } catch (e) {

    console.error(e);
    process.exit(1);

  }

});
