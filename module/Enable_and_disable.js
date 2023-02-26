import fs from 'fs-extra';
import path from 'path';

export default async (ctx) => {

    let __dirname = path.resolve();
    let id_chat = ctx?.chat?.id;
    let username_from = ctx?.from?.username;
    let type = ctx?.chat?.type;
    let body = ctx?.message.text;

    if (body === "تعطيل") {

        let fileJson = fs.readJsonSync(path.join(__dirname, `./database/${id_chat}.json`));

        if (type === "group" || type === "supergroup") {

            let admin = await ctx?.getChatAdministrators();
            let gAdmin = admin.find((e) => e?.user?.username === username_from);

            if (gAdmin) {

                if (fileJson?.evenPost) {

                    let message = 'لقد تم تعطيل الرسائل المجدولة \nلإعادة التفعيل ارسل كلمة تفعيل'
                    fileJson.evenPost = false;
                    fs.writeJsonSync(path.join(__dirname, `./database/${id_chat}.json`), fileJson, { spaces: '\t' });
                    await ctx.reply(message);
                }

                else {
                    await ctx.reply('الرسائل المجدولة معطلة بالفعل !!');
                }
            }

            else {
                await ctx.reply('يجب ان تكون مشرف لتعطيل الرسائل المجدولة !!');
            }
        }

        else if (type === "private") {

            if (fileJson?.evenPost) {

                let message = 'لقد تم تعطيل الرسائل المجدولة \nلإعادة التفعيل ارسل كلمة تفعيل'
                fileJson.evenPost = false;
                fs.writeJsonSync(path.join(__dirname, `./database/${id_chat}.json`), fileJson, { spaces: '\t' });
                await ctx.reply(message);
            }

            else {
                await ctx.reply('الرسائل المجدولة معطلة بالفعل !!');
            }
        }

    }

    else if (body === "تفعيل") {

        let fileJson = fs.readJsonSync(path.join(__dirname, `./database/${id_chat}.json`));

        if (type === "group" || type === "supergroup") {

            let admin = await ctx?.getChatAdministrators();
            let gAdmin = admin.find((e) => e?.user?.username === username_from);

            if (gAdmin) {

                if (fileJson?.evenPost === false || fileJson?.evenPost === undefined) {

                    let message = 'لقد تم تفعيل الرسائل المجدولة ✅'
                    fileJson.evenPost = true;
                    fs.writeJsonSync(path.join(__dirname, `./database/${id_chat}.json`), fileJson, { spaces: '\t' });
                    await ctx.reply(message);
                }

                else {
                    await ctx.reply('الرسائل المجدولة مفعلة بالفعل !!');
                }
            }

            else {
                await ctx.reply('يجب ان تكون مشرف لتفعيل الرسائل المجدولة !!');
            }
        }

        else if (type === "private") {

            if (fileJson?.evenPost === false || fileJson?.evenPost === undefined) {

                let message = 'لقد تم تفعيل الرسائل المجدولة \nلإعادة التعطيل ارسل كلمة تعطيل'
                fileJson.evenPost = true;
                fs.writeJsonSync(path.join(__dirname, `./database/${id_chat}.json`), fileJson, { spaces: '\t' });
                await ctx.reply(message);
            }

            else {
                await ctx.reply('الرسائل المجدولة مفعلة بالفعل !!');
            }
        }

    }
}