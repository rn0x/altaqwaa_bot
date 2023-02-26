import fs from 'fs-extra';
import path from 'path';

/**
 * 
 * @param {"all"|"private"|"group"|"supergroup"|"channel"} type 
 * @returns 
 */
export default async function get_database_telegram(type) {

    let __dirname = path.resolve();
    let database = fs.readdirSync(path.join(__dirname, './database'));
    let array = []

    for (let item of database) {

        let id = item.split('.json')[0]
        let chatJson = fs.readJsonSync(path.join(__dirname, `./database/${item}`));
        if (chatJson?.type === type || type === 'all') {

            array.push({
                id: chatJson?.id,
                username: chatJson?.username,
                name: chatJson?.name,
                type: chatJson?.type,
                status: chatJson?.status,
                evenPost: chatJson?.evenPost
            });
        }
    }

    return array
}