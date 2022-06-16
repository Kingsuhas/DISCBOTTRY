const { Client, Intents} = require('discord.js');

const dotenv = require('dotenv');

dotenv.config({path:"./.env"})

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready' , () => {
    console.log('GAbot is online');
});


client.on('messageCreate' , msg =>{
    if(msg.author.bot) return

    if(msg.channel.type == "dm") return


    if (msg.content == ".name"){
        msg.reply(msg.author.username);
    }
    });

client.login(process.env.TOKEN);