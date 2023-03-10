//import puppeteer from 'puppeteer';
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();

    await page.goto('https://www.buscalibre.cl/');

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});
    
    // Type into search box

    const books = ["devops", "dockers", "scrum"];

    for(let i =0;i<books.length;++i){

            console.log('Libro a buscar "%s".', books[i]);
            await page.type('input', books[i]);
            await page.keyboard.press("Enter");

            //click botón buscar  
            /*const botonSelector = await page.waitForSelector("#botonBuscarHeader");
            await botonSelector.click();*/

            const element = await page.waitForSelector("div.producto > a");
            await element.click(); 
            //#Título del Libro
            const valueSelector = await page.waitForSelector("p.tituloProducto");
            const value = await valueSelector.evaluate(el => el.textContent);
            console.log('Título Libro "%s".', value);

            //#Precio del Libro
            const precioSelector = await page.waitForSelector("p.precioAhora");
            const precio = await precioSelector.evaluate(el => el.textContent);
            console.log('Percio Libro "%s".', precio);
    }

})();