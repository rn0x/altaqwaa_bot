import fs from 'fs-extra';
import path, { join } from 'path';
import { Scenes, Markup } from 'telegraf';

const __dirname = path.resolve();
const albitaqat = fs.readJsonSync(path.join(__dirname, './files/json/albitaqat.json'));
const but_1 = [Markup.button.callback('الرجوع للقائمة الرئيسية 🏠', 'start')];
const button = Markup.inlineKeyboard([but_1]);

export default new Scenes.WizardScene(
    'albitaqat',
    async (ctx) => {

        let message = '<b>بطاقات القرآن الكريم🏰 :</b>\n\n'
        message += 'مشروع يهدف إلى خدمة القرآن الكريم وحفّاظِهِ وقارئيه، عن طريق توفير مَتْنٍ مختصرٍ شاملٍ لسور القرآن، وتوفير محتواه مرئياً ومسموعاً  \n\n\n'
        message += '<b>محتوياتُ (البِطَاقَات) :</b>\n\n'
        message += 'وضعتُ ثمانيةَ (8) عناصرَ موحَّدَةً في كلِّ بطاقةِ تعريفٍ بالسورةِ، مرتبةً ومُرَقَّمَةً، وكتبت بعباراتٍ واضحةٍ، وجُمَلٍ مختصرةٍ، وأسلوبٍ ميسرٍ ليسهُلَ حفظُهَا.\n\n\n'
        message += '<b>لإرسال البطاقة قم بإرسال إسم السورة او رقمها ✉️</b>'


        await ctx.reply(message, { parse_mode: 'HTML', reply_markup: button.reply_markup });
        return ctx?.wizard?.next();
    },
    async (ctx) => {

        let body = ctx?.message?.text;

        if (body) {

            let albitaqatStatus = true;

            body?.includes('سورة') | body?.includes('سوره ') ? body = body?.split('سورة ')?.join('')?.split('سوره')?.join('') : body;

            for (let item of albitaqat) {

                if (body === String(item?.id) || body === item?.surah) {

                    let message = `بطاقة سورة ${item?.surah}`

                    await ctx.replyWithPhoto(
                        {
                            url: item?.image
                        },
                        {
                            parse_mode: 'HTML',
                            caption: `${message} - صورة`
                        });

                    await ctx.replyWithAudio(
                        {
                            url: item?.audio
                        },
                        {
                            parse_mode: 'HTML',
                            caption: `${message} - صوت`
                        });

                    albitaqatStatus = false;

                }

            }

            if (albitaqatStatus) {

                let message = 'قم بكتابة إسم السورة او رقمه بشكل صحيح !';
                await ctx.reply(message, { parse_mode: 'HTML', reply_markup: button.reply_markup });

            }

            return ctx.wizard.selectStep(1);

        }

        else {
            return await ctx.scene.enter('start');
        }
    }
)