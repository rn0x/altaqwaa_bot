import { launch } from 'puppeteer';
import fs from 'fs-extra';
import path from 'path';
import CrateHtml from './CrateHtml.js';

export default async function Hijri_calendar(filename) {

    let browser

    try {

        let Html = await CrateHtml();
        let __dirname = path.resolve();
        let config = fs.readJSONSync(path.join(__dirname, './config.json'));
        let launchOptions = {
            headless: true,
            args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
            executablePath: config?.executablePath
        };
        browser = await launch(launchOptions).catch(e => console.log('Error: browser is not launch ', e));
        let page = await browser?.newPage();
        await page.evaluate(async () => {
            const selectors = Array.from(document.querySelectorAll("img"));
            await Promise.all(selectors.map(img => {
                if (img.complete) return;
                return new Promise((resolve, reject) => {
                    img.addEventListener('load', resolve);
                    img.addEventListener('error', reject);
                });
            }));
        });
        await page?.setViewport({ width: 650, height: 100 });
        await page?.goto(`file://${path.join(__dirname, './module/Hijri/index.html')}`, {
            waitUntil: 'networkidle0',
            timeout: 600000
        });
        let scre = await page?.screenshot({ path: filename, fullPage: true, quality: 100 });
        await page?.setCacheEnabled(true);
        await browser?.close();

        return {
            ...Html,
            buffer: scre
        }

    } catch (error) {
        return undefined

    } finally {
        await browser?.close();
    }
}