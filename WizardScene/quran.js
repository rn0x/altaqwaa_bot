import fs from 'fs-extra';
import path from 'path';
import { Scenes, Markup } from 'telegraf';
import file_size from '../module/file_size.js';

const __dirname = path.resolve();
const mp3quran = fs.readJsonSync(path.join(__dirname, './files/json/mp3quran.json'));
const but_1 = [Markup.button.callback('الرجوع للقائمة الرئيسية 🏠', 'start')];
const button = Markup.inlineKeyboard([but_1]);
 
export default new Scenes.WizardScene(
    'quran',
    async (ctx) => {

        let message = 'قم بإرسال إسم القارئ او رقمه ✉️ \n\n\n'

        for (let index = 0; index < 79; index++) {
            const item = mp3quran[index];
            message += `${item?.id}- <b>${item?.name}</b> - رواية ${item?.rewaya}\n`

        }

        await ctx.reply(message, { parse_mode: 'HTML' });


        let message2 = ''
        for (let index = 79; index < mp3quran.length; index++) {
            const item = mp3quran[index];
            message2 += `${item?.id}- <b>${item?.name}</b> - رواية ${item?.rewaya}\n`

        }

        await ctx.reply(message2, { parse_mode: 'HTML', reply_markup: button.reply_markup });

        return ctx.wizard.next();
    },
    async (ctx) => {

        let body = ctx?.message?.text;

        if (body) {

            for (let item of mp3quran) {

                if (body === String(item?.id) || item?.name?.includes(body)) {

                    ctx.wizard.state.reader = item
                    break
                }

            }

            if (ctx.wizard.state.reader === undefined) {

                let message = 'قم بكتابة إسم القارئ او رقمه بشكل صحيح !';
                await ctx.reply(message, { parse_mode: 'HTML', reply_markup: button.reply_markup });
                return ctx.wizard.selectStep(1);

            }

            else {

                let message = 'قم بإرسال إسم السورة او رقمها ✉️ \n\n'

                for (let item of mp3quran[0]?.audio) {

                    message += `${item?.id}- <b>${item?.name}</b>\n`


                }

                await ctx.reply(message, { parse_mode: 'HTML', reply_markup: button.reply_markup });

                return ctx.wizard.next();

            }
        }

        else {
            await ctx.scene.enter('start');
        }
    },

    async (ctx) => {

        let body = ctx?.message?.text;

        if (body) {

            let reader = ctx.wizard.state?.reader;

            if (reader) {

                let readerAudio = true

                for (let item of reader?.audio) {

                    if (body === String(item?.id) || item?.name?.includes(body)) {

                        readerAudio = false
                        let FileSize = await file_size(item?.link);

                        let message = `▪️ <b>القارئ:</b> ${reader?.name} \n`
                        message += `▪️ <b>الرواية:</b> ${reader?.rewaya} \n`
                        message += `▪️ <b>إسم السورة بالعربي:</b> ${item?.name} \n`
                        message += `▪️ <b>إسم السورة بالإنجليزي:</b> ${item?.english_name} \n`
                        message += `▪️ <b>رقم السورة:</b> ${item?.id} \n`
                        message += `▪️ <b>مكان النزول:</b> ${item?.descent} | ${item?.descent_english}`


                        if (FileSize.split('.')[0] >= 20 && FileSize.split(' ')[1] === 'MB') {

                            message += `\n▪️ <b>رابط ملف الصوت:</b> \n\n${item?.link}`
                            await ctx.reply(message, {
                                parse_mode: 'HTML'
                            })

                        }

                        else {

                            await ctx.replyWithAudio(item?.link, {
                                caption: message,
                                parse_mode: 'HTML'
                            });
                        }

                        break
                    }

                }

                if (readerAudio) {
                    let message = 'قم بكتابة إسم السورة او رقمه بشكل صحيح !';
                    await ctx.reply(message, { parse_mode: 'HTML', reply_markup: button.reply_markup });
                }

                return ctx.wizard.selectStep(2);
            }


            else {
                return ctx.scene.leave();
            }
        }

        else {
            await ctx.scene.enter('start');
        }
    }
)
