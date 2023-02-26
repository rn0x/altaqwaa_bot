import fs from 'fs-extra';
import path from 'path';
import { Scenes, Markup } from 'telegraf';
import database_telegram from '../module/database_telegram.js';
import get_database_telegram from '../module/get_database_telegram.js';

const __dirname = path.resolve();

export default new Scenes.WizardScene(
    'start',
    async (ctx) => {
        const __dirname = path.resolve();
        let id_from = ctx?.from?.id;
        let id_chat = ctx?.chat?.id;
        let username_from = ctx?.from?.username;
        let username_chat = ctx?.chat?.username;
        let name_from = ctx?.from?.first_name ? ctx?.from?.first_name : ctx?.from?.last_name ? ctx?.from?.last_name : undefined;
        let name_chat = ctx?.chat?.first_name ? ctx?.chat?.first_name : ctx?.chat?.last_name ? ctx?.chat?.last_name : ctx?.chat?.title;
        let name_bot = ctx?.botInfo?.first_name;
        let type = ctx?.chat?.type;
        let message_id = ctx?.message?.message_id;
        let getUserAll = await get_database_telegram("all");
        let getSupergroup = await get_database_telegram("supergroup");
        let getChannel = await get_database_telegram("channel");
        await database_telegram({
            id: id_chat,
            username: username_chat,
            name: name_chat,
            type: type,
            message_id: message_id
        });
        let but_1 = [Markup.button.callback('قرآن كريم 📖', 'quran'), Markup.button.callback('حصن المسلم 🏰', 'hisnmuslim')];
        let but_2 = [Markup.button.callback('أذكار 📿', 'adhkar'), Markup.button.callback('بطاقات 🎴', 'albitaqat')];
        let but_3 = [Markup.button.callback('فيديو 🎥', 'video'), Markup.button.callback('صور 🖼️', 'photo')];
        let but_4 = [Markup.button.callback('آية وتفسير 🌾', 'tafseer'), Markup.button.callback('أسماء الله الحسنى ✨', 'Names_Of_Allah')];
        let but_5 = [Markup.button.callback('التاريخ الهجري 📅', 'Hijri')];
        let but_6 = [Markup.button.callback('معلومات حول البوت ℹ️', 'info')];
        let button = Markup.inlineKeyboard([
            but_1,
            but_2,
            but_3,
            but_4,
            but_5,
            but_6
        ]);
        let message = ` مرحباً بك ${name_chat ? name_chat : `@${username_chat}`} في بوت ${name_bot} 👋 \n\n`
        message += 'يقدم هذا البوت العديد من الخدمات \n\n'
        message += '1- القرآن الكريم 📖 \n'
        message += '2- الأذكار 📿 \n'
        message += '3- فيديوهات قرآن عشوائية 🎥 \n'
        message += '4- صورة عشوائية 🖼️ \n'
        message += '5- أسماء الله الحسنى ✨ \n'
        message += '6- بطاقات القرآن 🎴 \n'
        message += '7- حصن المسلم 🏰 \n'
        message += '8- آية وتفسير 🌾 \n'
        message += '9- التاريخ الهجري 📅 \n\n\n'
        message += 'إحصائيات البوت \n\n'
        message += `عدد المحادثات : ${getUserAll.length}\n`
        message += `عدد المجموعات : ${getSupergroup.length}\n`
        message += `عدد القنوات : ${getChannel.length}\n\n\n`
        message += 'صلاحيات البوت \n\n'
        message += '- المجموعات: اذا كانت المجموعة عامة ومسموح فيها بالكتابة لايحتاج البوت الى صلاحيات اما اذا كانت المجموعة مقيدة يجب ان يمتلك البوت صلاحية الكتابة\n\n'
        message += 'القنوات: يجب ان يكون البوت مشرف ويمتلك صلاحية الكتابة\n\n\n'
        message += 'قم بالتنقل بين الخدمات بالضغط على الازرار التي بالأسفل 🔘'

        await ctx.reply(message, { parse_mode: 'HTML', reply_markup: button.reply_markup });

        return ctx?.scene?.leave()
    }
)