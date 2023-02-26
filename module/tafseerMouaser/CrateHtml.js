import fs from 'fs-extra';
import path from 'path';
import getRandomAyah from '../getRandomAyah.js';
import filterSpan from '../filterSpan.js';


export default async function CrateHtml() {    


    let __dirname = path.resolve();
    let Ayah = await getRandomAyah();
    let html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <img id="back" src="./icon/tfs.png">

    <div id="header">

        <img id="left" src="./icon/tfs.png">

    </div>

    <div id="ayah">
        <img src="./icon/ayah.png" id="ayah_img">
        <p id="ayah_text">

            ${filterSpan(Ayah?.ayah)}

        </p>

        <div id="ayah_fot">

            <p>
                سورة ${Ayah?.sura} - الآية: ${Ayah?.ayahID}
            </p>
        </div>
    </div>

    <div id="tfs">
        <img src="./icon/tafseer.png" id="tfs_img">
        <p id="tfs_text">

            ${filterSpan(Ayah?.tafseer)}

        </p>

        <div id="tfs_fot">

            <p>
                من كتاب التفسير الميسر للقرآن الكريم 
            </p>
        </div>
    </div>


    <div id="footer">

        <!-- <p>
            حسابنا على تيليجرام tqw24h@
        </p> -->

        <img id="right" src="./icon/logo.png">

    </div>

</body>

</html>`
    fs.writeFileSync(path.join(__dirname, './module/tafseerMouaser/index.html'), html);

    return Ayah
}