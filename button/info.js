import database_telegram from '../module/database_telegram.js';


export default async (client, Markup) => {

    client.action("info", async (ctx) => {

        let but_1 = [Markup.button.url('قروب أذكار المسلم 🌿', 'https://t.me/tqw24h')];
        let but_2 = [Markup.button.callback('الرجوع للقائمة الرئيسية 🏠', 'start')];
        let button = Markup.inlineKeyboard([but_1, but_2]);
        let message = '- <b>#حول_البوت 🤖</b> \n\n\n'
        message += '- بوت إسلامي يقدم العديد من الخدمات التي يحتاجها المسلم في يومه \n\n'
        message += '- بوت مفتوح المصدر تحت ترخيص <b>MIT</b> \n\n'
        message += `- يمكن المساهمه في تطوير البوت عبر طلب سحب على <b><a href="https://github.com/rn0x/altaqwaa_bot">جيتهب</a></b> \n\n`
        message += `- يمكن التبليغ عن المشاكل او طلب مميزات عبر مراسلتي على <b><a href="https://t.me/binattia">الخاص</a></b>`

        await database_telegram({
            id: ctx?.chat?.id,
            username: ctx?.chat?.username,
            name: ctx?.chat?.first_name ? ctx?.chat?.first_name : ctx?.chat?.last_name ? ctx?.chat?.last_name : ctx?.chat?.title,
            type: ctx?.chat?.type,
            message_id: ctx?.message?.message_id
        });

        await ctx.reply(message, {
            parse_mode: 'HTML',
            reply_markup: button.reply_markup,
            disable_web_page_preview: true
        });
    });
}