import start from './start.js';
import quran from './quran.js';
import hisnmuslim from './hisnmuslim.js';
import adhkar from './adhkar.js';
import albitaqat from './albitaqat.js';
import video from './video.js';
import photo from './photo.js';
import Names_Of_Allah from './Names_Of_Allah.js';
import tafseer from './tafseer.js';
import Hijri from './Hijri.js';
import info from './info.js';

export default async function button(client, Markup) {

    try {

        await start(client, Markup);
        await quran(client, Markup);
        await hisnmuslim(client, Markup);
        await adhkar(client, Markup);
        await albitaqat(client, Markup);
        await video(client, Markup);
        await photo(client, Markup);
        await Names_Of_Allah(client, Markup);
        await tafseer(client, Markup);
        await Hijri(client, Markup);
        await info(client, Markup);

    } catch (error) {

        console.log(error);

    }

}