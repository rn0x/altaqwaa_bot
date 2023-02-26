import fs from 'fs-extra';
import path from 'path';
import database_telegram from './database_telegram.js';
import get_database_telegram from './get_database_telegram.js';
import Enable_and_disable from './Enable_and_disable.js';

export default async function EventText(client) {

    client.on('text', async (ctx) => {

        let __dirname = path.resolve();
        let id_from = ctx?.from?.id;
        let id_chat = ctx?.chat?.id;
        let username_from = ctx?.from?.username;
        let username_chat = ctx?.chat?.username;
        let name_from = ctx?.from?.first_name ? ctx?.from?.first_name : ctx?.from?.last_name ? ctx?.from?.last_name : undefined;
        let name_chat = ctx?.chat?.first_name ? ctx?.chat?.first_name : ctx?.chat?.last_name ? ctx?.chat?.last_name : ctx?.chat?.title;
        let type = ctx?.chat?.type;
        let message_id = ctx?.message?.message_id;
        let me = ctx?.botInfo
        let body = ctx?.message.text;
        let reply_caption = ctx?.message?.reply_to_message?.caption
        let reply_text = ctx?.message?.reply_to_message?.text

        await database_telegram({
            id: id_chat,
            username: username_chat,
            name: name_chat,
            type: type,
            message_id: message_id
        });

        await Enable_and_disable(ctx);

    });
}