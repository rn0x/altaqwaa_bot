import { launch } from 'puppeteer';
import path from 'path';
import fs from 'fs-extra';
import CrateHtml from './CrateHtml.js';


export default async function tafseermouaser(filename) {

    let browser;

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
        await page?.setViewport({ width: 700, height: 0 });
        await page?.goto(`file://${path.join(__dirname, './module/tafseerMouaser/index.html')}`, {
            waitUntil: 'networkidle0',
            timeout: 600000
        });
        let buffer = await page?.screenshot({ path: filename, fullPage: true, quality: 100 });
        await page?.setCacheEnabled(true);
 
        return {
            buffer: buffer,
            filename: filename,
            suraID: Html?.suraID,
            sura: Html?.sura,
            suraEn: Html?.suraEn,
            ayahID: Html?.ayahID,
            ayah: Html?.ayah,
            jozz: Html?.jozz,
            page: Html?.page,
            verses: Html?.verses,
            words: Html?.words,
            letters: Html?.letters,
            descent: Html?.descent,
            tafseer: Html?.tafseer
        }

    } catch (error) {

        console.log(error);
        return error

    } finally {

        await browser?.close();
    }

}
