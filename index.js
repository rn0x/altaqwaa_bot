import { Telegraf, Markup, Scenes, session } from 'telegraf';
import fs from 'fs-extra';
import path from 'path';
import moment from 'moment-hijri';
import WizardScene from './WizardScene/index.js';
import join_left from './module/join_left.js';
import EventText from './module/EventText.js';
import command from './command/index.js';
import button from './button/index.js';
import error_handling from './module/error_handling.js';
import scheduling_messages from './module/scheduling_messages.js';

const __dirname = path.resolve();

async function teleAltaqwaa() {

    // npm start

    const pkg = fs.readJsonSync(path.join(__dirname, './package.json'));
    console.log(`teleAltaqwaa v${pkg?.version} is ready! ${moment().locale('en-EN').format('LT')}`)

    // Crate Folder

    fs.existsSync(path.join(__dirname, './database')) ? true :
        fs.mkdirSync(path.join(__dirname, './database'), { recursive: true });

    const config = fs.readJsonSync(path.join(__dirname, './config.json'));
    const options = { channelMode: true, polling: true };
    const client = new Telegraf(config?.token_telegram, options);
    const stage = new Scenes.Stage(WizardScene);
    client.use(session())
    client.use(stage.middleware());

    // Events

    await command(client, Markup);
    await button(client, Markup);
    await join_left(client);
    await EventText(client);


    // Scheduling Messages

    await scheduling_messages(client);

    // Start App

    client.launch();

    // Override Error Handling
    
    client.catch(async (error) => {
        await error_handling(error, client);
    });

}


await teleAltaqwaa().catch(e => console.log(e));
