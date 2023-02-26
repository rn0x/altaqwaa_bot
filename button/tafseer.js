import path from 'path';
import database_telegram from '../module/database_telegram.js';
import tafseerMouaser from '../module/tafseerMouaser/index.js';


export default async (client, Markup) => {

    client.action("tafseer", async (ctx) => {

        const __dirname = path.resolve();
        const TFSMouaser = await tafseerMouaser(path.join(__dirname, './tafseerMouaser.jpeg')).catch(e => console.log(e));
        const but_1 = [Markup.button.callback('🔄', 'tafseer')];
        const but_2 = [Markup.button.callback('الرجوع للقائمة الرئيسية 🏠', 'start')];
        const button = Markup.inlineKeyboard([but_1, but_2]);
        let message = `ـ ❁ …\n\n\nسورة <b>${TFSMouaser?.sura}</b> الآية: ${TFSMouaser?.ayahID}\n\n`
        message += `<b>${TFSMouaser?.ayah}</b>\n\n`
        message += `${TFSMouaser?.tafseer}`

        await database_telegram({
            id: ctx?.chat?.id,
            username: ctx?.chat?.username,
            name: ctx?.chat?.first_name ? ctx?.chat?.first_name : ctx?.chat?.last_name ? ctx?.chat?.last_name : ctx?.chat?.title,
            type: ctx?.chat?.type,
            message_id: ctx?.message?.message_id
        });

        if (TFSMouaser?.buffer) {

            await ctx.replyWithPhoto({ source: TFSMouaser?.buffer }, {
                parse_mode: 'HTML',
                caption: message,
                reply_markup: button.reply_markup
            });

        }
    });
}