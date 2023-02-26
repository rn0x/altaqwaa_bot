import fs from 'fs-extra';
import database_telegram from './database_telegram.js';
import path from 'path';

export default async function join_left(client) {

    client.on("my_chat_member", async (ctx) => {

        const __dirname = path.resolve();
        let id_from = ctx?.from?.id;
        let id_chat = ctx?.chat?.id;
        let username_chat = ctx?.chat?.username;
        let name_from = ctx?.from?.first_name ? ctx?.from?.first_name : ctx?.from?.last_name ? ctx?.from?.last_name : undefined;
        let name_chat = ctx?.chat?.first_name ? ctx?.chat?.first_name : ctx?.chat?.last_name ? ctx?.chat?.last_name : ctx?.chat?.title;
        let type = ctx?.chat?.type;
        let new_chat_member = ctx?.update?.my_chat_member?.new_chat_member;
        let status = new_chat_member?.status;
        let filter = Object.keys(new_chat_member).filter(e => e.includes('can'));
        let can = Object.assign({}, ...filter.map(e => ({ [e]: new_chat_member[e] })));

        if (status === 'member' || status === 'administrator') {

            await database_telegram({
                id: id_chat,
                username: username_chat,
                name: name_chat,
                type: type,
                status: status,
                evenPost: true
            });


            if (type !== "channel") {

                let message = username_chat ?
                    `مرحبا @${username_chat} لقد تم تفعيل خدمة إرسال الرسائل بشكل تلقائي \nلتعطيل الخدمة أرسل كلمة تعطيل` :
                    `مرحبا ${name_chat} لقد تم تفعيل خدمة إرسال الرسائل بشكل تلقائي \nلتعطيل الخدمة أرسل كلمة تعطيل`;

                await ctx.reply(message)
            }
        }

        else if (status === 'left' || status === 'kicked') {

            let existsSync = fs.existsSync(path.join(__dirname, `./database/${id_chat}.json`));

            if (existsSync) {

                fs.removeSync(path.join(__dirname, `./database/${id_chat}.json`));
            }

        }
    });

}