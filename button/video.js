import fs from 'fs-extra';
import path from 'path';
import database_telegram from '../module/database_telegram.js';


export default async (client, Markup) => {

    client.action("video", async (ctx) => {

        const __dirname = path.resolve();
        const video = fs.readJsonSync(path.join(__dirname, './files/json/video.json'));
        const but_1 = [Markup.button.callback('🔄', 'video')];
        const but_2 = [Markup.button.callback('الرجوع للقائمة الرئيسية 🏠', 'start')];
        const button = Markup.inlineKeyboard([but_1, but_2]);
        const random = video[Math.floor(Math.random() * video.length)];

        await database_telegram({
            id: ctx?.chat?.id,
            username: ctx?.chat?.username,
            name: ctx?.chat?.first_name ? ctx?.chat?.first_name : ctx?.chat?.last_name ? ctx?.chat?.last_name : ctx?.chat?.title,
            type: ctx?.chat?.type,
            message_id: ctx?.message?.message_id
        });

        await ctx.replyWithVideo({ url: random?.path}, {
            reply_markup: button.reply_markup
        });
    });
}