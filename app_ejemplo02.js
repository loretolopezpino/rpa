//import puppeteer from 'puppeteer';
const puppeteer = require("puppeteer");

/*(async () => {
    console.log("hola");
})();*/

(async () => {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();

    await page.goto('https://www.lapolar.cl/');

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});
    
    // Type into search box
    await page.type('.search-field', 'polerones');
    await page.keyboard.press("Enter");

    // Wait and click on first result
    const searchResultSelector = "[itemprop='name']";
    //const searchResultSelector = "#search-box__link-1";
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    // Locate the full title with a unique string
    const valueSelector = await page.waitForSelector(".price-value");

    const value = await valueSelector.evaluate(el => el.value);

    // Print the full title
    console.log('El valor del poleron es "%s".', value);



  await browser.close();

})();

