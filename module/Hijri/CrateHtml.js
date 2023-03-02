import fs from "fs-extra";
import path from 'path';
import moment_hijri from 'moment-hijri';
import filterSpan from '../filterSpan.js';


export default async function CrateHtml() {

    let Arr = [
        'ayaatiha',
        'maeni_asamuha',
        'sabab_tasmiatiha',
        'maqsiduha_aleamu',
        'sabab_nuzuliha',
        'fadluha',
        'munasabatiha'
    ]
    let __dirname = path.resolve();
    let today = moment_hijri().locale('ar-SA').format('dddd'); // اليوم
    let todayEn = moment_hijri().locale('en').format('dddd'); // اليوم
    let Hijri = moment_hijri().locale('ar-SA').format('iMMMM iYYYY');
    let Hijri_Number = moment_hijri().locale('ar-SA').format('iD');
    let Gregorian = moment_hijri().locale('en').format('YYYY/M/D');
    let albitaqat = fs.readJsonSync('./files/json/albitaqat.json');
    let random = albitaqat[Math.floor(Math.random() * albitaqat.length)];
    let randomArr = Arr[Math.floor(Math.random() * Arr.length)];
    let title = randomArr === 'ayaatiha' ? 'آيَـــــــــــــــاتُـــــها' : randomArr === 'maeni_asamuha' ? 'مَعــــــنَـى اسْـــــــمِها' : randomArr === 'sabab_tasmiatiha' ? 'سَبَبُ تَسْمِيَتِها' : randomArr === 'maqsiduha_aleamu' ? 'مَقْصِدُها العَامُّ' : randomArr === 'sabab_nuzuliha' ? 'سَبَبُ نُزُولِهَا' : randomArr === 'fadluha' ? 'فَضْــــــلُها' : 'مُنَــاسَــبَاتُــها';
    let body = Array.isArray(random?.[randomArr]) ? random?.[randomArr].join('<br>') : random?.[randomArr];


    let html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <!--  header  -->

    <div id="header">

        <div id="header_top">
            <p id="number">${Hijri_Number}</p>

            <div id="today">

                <p id="today_ar">${today}</p>
                <p id="today_en">${todayEn}</p>

            </div>
        </div>

        <div id="header_bottom">

            <p>${Hijri} هـ</p>

            <P>${Gregorian} م</P>

        </div>

    </div>

    <!--  content  -->

    <div id="content">

        <p id="title">سورة ${random?.surah} | ${title}</p>

        <div id="text">

            ${filterSpan(body)}

        </div>

    </div>

    <!--  footer  -->

    <div id="footer">

        <div id="footer_text">
            <p>فوائد يومية منتقاة من كتاب البطاقات </p>
            <small id="website">www.albitaqat.com</small>
        </div>

        <img src="logo_up.png" id="logo">
    </div> 

</body>

</html>`


    fs.writeFileSync(path.join(__dirname, './module/Hijri/index.html'), html);

    return {
        today: today,
        todayEn: todayEn,
        Hijri: moment_hijri().locale('ar-SA').format('iYYYY/iM/iD'),
        Gregorian: moment_hijri().locale('en').format('YYYY/M/D'),
        title: title,
        surah: random?.surah,
        body: Array.isArray(random?.[randomArr]) ? random?.[randomArr].join('\n') : random?.[randomArr]
    }
}
