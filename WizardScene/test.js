import fs from 'fs-extra';
import path from 'path';
import { Scenes, Markup } from 'telegraf';

const __dirname = path.resolve();
const hisnmuslim = fs.readJsonSync(path.join(__dirname, './files/json/hisnmuslim.json'));
const but_1 = [Markup.button.callback('الرجوع للقائمة الرئيسية 🏠', 'start')];
const button = Markup.inlineKeyboard([but_1]);

export default new Scenes.WizardScene(
    'hisnmuslim',
    async (ctx) => {

        let message = '<b>حصن المسلم 🏰</b>\n\n'
        message += ' كتاب أدعية تأليف سعيد بن علي بن وهف القحطاني حرر في شهر صفر 1409هـ والكتاب يحتوي على أذكار النبي محمد صلى الله عليه وسلم في مختلف مواضع الحياة اليومية وهو من أكثر الكتب الإسلامية انتشارا لسهولة أسلوبه والتزامه بالصحيح من الأحاديث. \n\n'
        message += '<b>قم بإرسال إسم الفئة او رقمها ✉️</b>\n\n'

        for (let item of hisnmuslim) {

            message += `${item?.id}- <b>${item?.category}</b>\n`

        }

        await ctx.reply(message, { parse_mode: 'HTML', reply_markup: button.reply_markup });
        return ctx?.wizard?.next();
    },
    async (ctx) => {

        let body = ctx?.message?.text;

        if (body) {



            await ctx.reply(body);

            //return ctx.wizard.next();
            return ctx.scene.leave();
        }

        else {
            return await ctx.scene.enter('start');
        }
    }
)