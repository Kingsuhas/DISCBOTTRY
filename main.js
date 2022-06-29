const { Client, Intents, MessageActionRow, Modal, TextInputComponent} = require('discord.js');

const { GiveawaysManager } = require('discord-giveaways');

const ms = require('ms');

const dotenv = require('dotenv');

dotenv.config({path:"./.env"})

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

client.on('ready' , () => {
    console.log('GAbot is online');
});

const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});

client.giveawaysManager = manager;

client.on('interactionCreate', async interaction => {

    if (interaction.customId === 'first') {
        try {
            const nameResponse = interaction.fields.getTextInputValue('name');
            const numberResponse = parseInt(interaction.fields.getTextInputValue('number'));
            const timeResponse = interaction.fields.getTextInputValue('time');
            console.log(nameResponse,numberResponse,timeResponse)
            await interaction.reply({ content: 'Your submission was recieved successfully!' });
            client.giveawaysManager
            .start(interaction.channel, {
                duration: ms(`${timeResponse}`),
                winnerCount: numberResponse,
                prize: nameResponse,
                hostedBy : interaction.user,
                
                messages: {
                    giveaway: '🎉🎉 **GIVEAWAY** 🎉🎉',
                    giveawayEnded: '🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
                    drawing: 'Time Remaining: {timestamp}',
                    dropMessage: 'Be the first to react with 🎉 !',
                    inviteToParticipate: 'React with 🎉 to participate!',
                    winMessage: 'Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}',
                    embedFooter: '{this.winnerCount} winner(s)',
                    noWinner: 'Giveaway cancelled, no valid participations.',
                    hostedBy: 'Hosted by: {this.hostedBy}',
                    winners: 'Winner(s):',
                    endedAt: 'Ended at',

                }
            })
            .then((data) => {
                if(data) {
                    console.log(data); // {...} (messageId, end date and more)
                }
            })
            .catch(console.log("Error"));
            // console.log(client.giveawaysManager);
        } catch (e) {
            console.log(e);
        }
    }

    if (interaction.commandName === 're') {
        const messageId = interaction.options.getString('message_id');
        client.giveawaysManager
            .reroll(messageId)
            .then(() => {
                interaction.reply('Success! Giveaway rerolled!');
            })
            .catch((err) => {
                interaction.reply(`An error has occurred, please check and try again.\n\`${err}\``);
            });
    }

    if (interaction.commandName === 'ping') {
        if (!interaction.member.permissions.has(["ADMINISTRATOR"])){
            interaction.reply("You don't have enough permissions to start a giveaway !")
            return
        }  

		const modal = new Modal()
			.setCustomId('first')
			.setTitle('Giveaway Master');

        const nameInput = new TextInputComponent()
			.setCustomId('name')
			.setLabel("Enter name of Giveaway")
			.setStyle('SHORT')
            .setPlaceholder('name');

        const numberInput = new TextInputComponent()
			.setCustomId('number')
			.setLabel("Enter number of Winners")
			.setStyle('SHORT')
            .setPlaceholder('number');   
            
        const timeInput = new TextInputComponent()
			.setCustomId('time')
			.setLabel("Enter duration of Giveaway")
			.setStyle('SHORT') 
            .setPlaceholder('duration');   

        const firstActionRow = new MessageActionRow().addComponents(nameInput);
        const secondActionRow = new MessageActionRow().addComponents(numberInput);
        const thirdActionRow = new MessageActionRow().addComponents(timeInput);            
        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

		await interaction.showModal(modal, {
            client: client,
            interaction: interaction
        });
    }
});


client.login(process.env.TOKEN);