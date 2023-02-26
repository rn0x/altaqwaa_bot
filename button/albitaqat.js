import fs from 'fs-extra';
import path from 'path';
import database_telegram from '../module/database_telegram.js';


export default async (client, Markup) => {

    client.action("albitaqat", async (ctx) => {

        await database_telegram({
            id: ctx?.chat?.id,
            username: ctx?.chat?.username,
            name: ctx?.chat?.first_name ? ctx?.chat?.first_name : ctx?.chat?.last_name ? ctx?.chat?.last_name : ctx?.chat?.title,
            type: ctx?.chat?.type,
            message_id: ctx?.message?.message_id
        });

        await ctx.scene.enter('albitaqat');
    });
}