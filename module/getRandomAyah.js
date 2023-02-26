import fs from 'fs-extra';
import path from 'path';

export default async function getRandomAyah() {

    let __dirname = path.resolve();
    let tafseerMouaser = fs.readJSONSync(path.join(__dirname, './files/json/tafseerMouaser.json'));
    let quran = fs.readJSONSync(path.join(__dirname, './files/json/quran.json'));
    let randomTfs = tafseerMouaser[Math.floor(Math.random() * tafseerMouaser.length)];
    let sura = quran.find(e => String(e?.number) === randomTfs?.sura_no);
    let ayah = sura?.array_verses[0].find(e => String(e?.id) === randomTfs?.aya_no);

    return {
        suraID: sura?.number,
        sura: sura?.name,
        suraEn: sura?.name_translation,
        ayahID: ayah?.id,
        ayah: `﴿ ${ayah?.ar} ﴾`,
        jozz: randomTfs?.jozz,
        page: randomTfs?.page,
        verses: sura?.number_verses,
        words: sura?.number_words,
        letters: sura?.number_letters,
        descent: sura?.descent,
        tafseer: randomTfs?.aya_tafseer

    }
}

