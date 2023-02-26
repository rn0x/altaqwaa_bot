import fs from 'fs-extra';
import path from 'path';

export default async (error) => {

    const __dirname = path.resolve();

    if (error.response !== undefined) {

        if (error.response.description === "Bad Request: group chat was upgraded to a supergroup chat") {

            let id_new = error.response.parameters.migrate_to_chat_id;
            let id_old = error.on.payload.chat_id;
            let fileOld = fs?.readJsonSync(path?.join(__dirname, `./database/${id_old}.json`));
            fileOld.id = id_new;
            fs.writeJsonSync(path.join(__dirname, `./database/${id_new}.json`), fileOld);
            fs.removeSync(path?.join(__dirname, `./database/${id_old}.json`));


        }

        else if (error.response.description === "Forbidden: user is deactivated") {

            let id_user = error.on.payload.chat_id
            fs.existsSync(path?.join(__dirname, `./database/${id_user}.json`)) ?
                fs.removeSync(path?.join(__dirname, `./database/${id_user}.json`)) : false;

        }

        else if (error.response.description === "Bad Request: need administrator rights in the channel chat") {

            let id_user = error.on.payload.chat_id

            fs.existsSync(path?.join(__dirname, `./database/${id_user}.json`)) ?
                fs.removeSync(path?.join(__dirname, `./database/${id_user}.json`)) : false;

        }

        else if (error.response.description === "Forbidden: bot was blocked by the user") {

            let id_user = error.on.payload.chat_id

            fs.existsSync(path?.join(__dirname, `./database/${id_user}.json`)) ?
                fs.removeSync(path?.join(__dirname, `./database/${id_user}.json`)) : false;

        }

        else if (error.response.description === "Bad Request: chat not found") {

            let id_user = error.on.payload.chat_id

            fs.existsSync(path?.join(__dirname, `./database/${id_user}.json`)) ?
                fs.removeSync(path?.join(__dirname, `./database/${id_user}.json`)) : false;

        }

        else if (error.response.description === "Forbidden: bot was kicked from the supergroup chat") {

            let id_user = error.on.payload.chat_id

            fs.existsSync(path?.join(__dirname, `./database/${id_user}.json`)) ?
                fs.removeSync(path?.join(__dirname, `./database/${id_user}.json`)) : false;

        }

        else if (error.response.description === "Bad Request: message to delete not found") {

            let id_user = error.on.payload.chat_id
            let message_id = error.on.payload.message_id
            let fileJson = fs?.readJsonSync(path?.join(__dirname, `./database/${id_user}.json`));

            if (fileJson?.message_id || fileJson?.message_id !== message_id) {

                delete fileJson.message_id
                fs.writeJsonSync(path?.join(__dirname, `./database/${id_user}.json`), fileJson);

            }

        }

        else if (error.response.description === "Bad Request: message can't be deleted for everyone") {

            let id_user = error.on.payload.chat_id
            let message_id = error.on.payload.message_id
            let fileJson = fs?.readJsonSync(path?.join(__dirname, `./database/${id_user}.json`));

            if (fileJson?.message_id || fileJson?.message_id !== message_id) {

                delete fileJson.message_id
                fs.writeJsonSync(path?.join(__dirname, `./database/${id_user}.json`), fileJson);

            }

        }

        else {
            console.log(error);
        }
    }

    console.log(error);
}