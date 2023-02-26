import fs from 'fs-extra';
import path from 'path';


export default async function database_telegram({
    id: id,
    username: username,
    name: name,
    type: type,
    status: status,
    evenPost: evenPost,
    message_id: message_id
}) {

    let __dirname = path.resolve();
    let create_db_user = fs.existsSync(path.join(__dirname, `./database/${id}.json`));

    if (create_db_user === false) {

        let opj = {
            id: id ? id : undefined,
            username: username ? username : undefined,
            name: name ? name : undefined,
            type: type ? type : undefined,
            status: status? status : undefined,
            evenPost: evenPost ? evenPost : undefined,
            message_id: message_id ? message_id : undefined
        }

        fs.writeJsonSync(path.join(__dirname, `./database/${id}.json`), opj, { spaces: '\t' });

    }

    else {

        let db_user = fs.readJsonSync(path.join(__dirname, `./database/${id}.json`));
        username ? db_user.username = username : undefined;
        name ? db_user.name = name : undefined;
        type ? db_user.type = type : undefined;
        message_id ? db_user.message_id = message_id : undefined;
        fs.writeJsonSync(path.join(__dirname, `./database/${id}.json`), db_user, { spaces: '\t' });
    }

}