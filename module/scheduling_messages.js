import fs from 'fs-extra';
import path from 'path';
import moment from 'moment-hijri';
import get_database_telegram from './get_database_telegram.js';
import file_size from './file_size.js';
import tafseerMouaser from './tafseerMouaser/index.js';
import Hijri from './Hijri/index.js';

export default async (client) => {

    setInterval(async () => {

        let __dirname = path.resolve();
        let time = moment().locale('en-EN').format('LT');
        let today = moment().locale('ar-SA').format('dddd');
        let time_quran = ["2:00 PM"];
        let time_video = ["8:00 AM"];
        let time_tafseer = ["7:00 PM"];
        let time_Hijri = ["12:02 AM"];
        let GetAllUsers = await get_database_telegram("all");

        if (time_quran.includes(time)) {

            let mp3quran = fs.readJsonSync(path.join(__dirname, './files/json/mp3quran.json'));

            for (let item of GetAllUsers) {

                if (item?.evenPost) {

                    let random = mp3quran[Math.floor(Math.random() * mp3quran.length)];
                    let mp3quranRandom = random?.audio[Math.floor(Math.random() * random?.audio.length)];
                    let FileSize = await file_size(mp3quranRandom?.link);
                    let message = `▪️ <b>القارئ:</b> ${random?.name} \n`
                    message += `▪️ <b>الرواية:</b> ${random?.rewaya} \n`
                    message += `▪️ <b>إسم السورة بالعربي:</b> ${mp3quranRandom?.name} \n`
                    message += `▪️ <b>إسم السورة بالإنجليزي:</b> ${mp3quranRandom?.english_name} \n`
                    message += `▪️ <b>رقم السورة:</b> ${mp3quranRandom?.id} \n`
                    message += `▪️ <b>مكان النزول:</b> ${mp3quranRandom?.descent} | ${mp3quranRandom?.descent_english}`


                    if (FileSize.split('.')[0] >= 20 && FileSize.split(' ')[1] === 'MB') {

                        message += `\n▪️ <b>رابط ملف الصوت:</b> \n\n${mp3quranRandom?.link}`
                        await client.telegram.sendMessage(item?.id, message, {
                            parse_mode: 'HTML'
                        })

                    }

                    else {

                        await client.telegram.sendAudio(item?.id, { url: mp3quranRandom?.link }, {
                            caption: message,
                            parse_mode: 'HTML'
                        });
                    }
                }

            }

        }

        else if (time_video.includes(time)) {

            let video = fs.readJsonSync(path.join(__dirname, './files/json/video.json'));

            for (let item of GetAllUsers) {

                if (item?.evenPost) {

                    let random = video[Math.floor(Math.random() * video.length)];
                    await client.telegram.sendVideo(item?.id, { url: random?.path });
                }

            }

        }

        else if (time_tafseer.includes(time)) {

            let TFSMouaser = await tafseerMouaser(path.join(__dirname, './tafseerMouaser.jpeg')).catch(e => console.log(e));

            for (let item of GetAllUsers) {

                if (item?.evenPost) {

                    let message = `ـ ❁ …\n\n\nسورة <b>${TFSMouaser?.sura}</b> الآية: ${TFSMouaser?.ayahID}\n\n`
                    message += `<b>${TFSMouaser?.ayah}</b>\n\n`
                    message += `${TFSMouaser?.tafseer}`

                    if (TFSMouaser?.buffer) {

                        await client.telegram.sendPhoto(item?.id, { source: TFSMouaser?.buffer }, {
                            parse_mode: 'HTML',
                            caption: message
                        });

                    }
                }

            }

        }

        else if (time_Hijri.includes(time)) {

            let Hijri_ = await Hijri(path.join(__dirname, './Hijri.jpeg')).catch(e => console.log(e));

            for (let item of GetAllUsers) {

                if (item?.evenPost) {

                    let message = '#التقويم_الهجري 📅\n\n'
                    message += `#${Hijri_?.today} | #${Hijri_.todayEn}\n`
                    message += `التاريخ الهجري: ${Hijri_?.Hijri}\n`
                    message += `التاريخ الميلادي: ${Hijri_?.Gregorian} \n\n\n`
                    message += `سورة ${Hijri_?.surah} | ${Hijri_?.title} \n\n`
                    message += `${Hijri_?.body}`

                    if (Hijri_) {

                        await client.telegram.sendPhoto(item?.id, { source: Hijri_?.buffer }, {
                            parse_mode: 'HTML',
                            caption: message
                        });

                    }

                }

            }

        }

    }, 60000);

}
