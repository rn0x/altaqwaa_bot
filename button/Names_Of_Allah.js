import fs from 'fs-extra';
import path from 'path';
import database_telegram from '../module/database_telegram.js';


export default async (client, Markup) => {

    client.action("Names_Of_Allah", async (ctx) => {

        const __dirname = path.resolve();
        const Names_Of_Allah = fs.readJsonSync(path.join(__dirname, './files/json/Names_Of_Allah.json'));
        const but_1 = [Markup.button.callback('🔄', 'Names_Of_Allah')];
        const but_2 = [Markup.button.callback('الرجوع للقائمة الرئيسية 🏠', 'start')];
        const button = Markup.inlineKeyboard([but_1, but_2]);
        const random = Names_Of_Allah[Math.floor(Math.random() * Names_Of_Allah.length)];
        let message = `<b>الإسم: ${random.name}</b>\n\n`
        message += `المعنى: ${random.text}\n\n`
        await database_telegram({
            id: ctx?.chat?.id,
            username: ctx?.chat?.username,
            name: ctx?.chat?.first_name ? ctx?.chat?.first_name : ctx?.chat?.last_name ? ctx?.chat?.last_name : ctx?.chat?.title,
            type: ctx?.chat?.type,
            message_id: ctx?.message?.message_id
        });

        await ctx.reply(message, { parse_mode: 'HTML', reply_markup: button.reply_markup });
    });
}