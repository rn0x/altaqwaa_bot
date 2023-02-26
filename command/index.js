import start from './start.js';

export default async function command(client, Markup) {

    try {

        await start(client, Markup);

    } catch (error) {

        console.log(error);

    }

}