import fs from 'fs-extra';
import path from 'path';
import database_telegram from '../module/database_telegram.js';


export default async (client, Markup) => {

    client.action("adhkar", async (ctx) => {

        const __dirname = path.resolve();
        const hisnmuslim = fs.readJsonSync(path.join(__dirname, './files/json/hisnmuslim.json'));
        const but_1 = [Markup.button.callback('🔄', 'adhkar')];
        const but_2 = [Markup.button.callback('الرجوع للقائمة الرئيسية 🏠', 'start')];
        const button = Markup.inlineKeyboard([but_1, but_2]);
        const random = hisnmuslim[Math.floor(Math.random() * hisnmuslim.length)];
        const random_arr = random?.array[Math.floor(Math.random() * random?.array.length)];
        let message = `<b>${random?.category} :</b>\n\n`;
        message += random_arr?.text

        await database_telegram({
            id: ctx?.chat?.id,
            username: ctx?.chat?.username,
            name: ctx?.chat?.first_name ? ctx?.chat?.first_name : ctx?.chat?.last_name ? ctx?.chat?.last_name : ctx?.chat?.title,
            type: ctx?.chat?.type,
            message_id: ctx?.message?.message_id
        });

        await ctx.replyWithAudio(random_arr?.audio, {
            parse_mode: 'HTML',
            caption: message,
            reply_markup: button.reply_markup
        });
    });
}