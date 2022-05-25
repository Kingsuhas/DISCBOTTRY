const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready' , () => {
    console.log('GAbot is online');
});

client.on('message' , (message) =>{
    message.reply('meow');
});

client.login('OTc2NDExMzI2NjE0MjE2NzA0.GJQCDb.boodbR9CSzwZ5v9aY7S78p2lqGwZ8UQUc5r8PM');