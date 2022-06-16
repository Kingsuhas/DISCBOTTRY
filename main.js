const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent} = require('discord.js');

const dotenv = require('dotenv');

dotenv.config({path:"./.env"})

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready' , () => {
    console.log('GAbot is online');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'new') {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('START')
					.setStyle('PRIMARY'),
			);

            const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Start a New Giveaway')
			.setURL('https://discord.js.org')
			.setDescription('Enter the name \n The number of winners And \n Time period of Giveaway');

		await interaction.reply({ content: 'Pong!', ephemeral: true, embeds: [embed], components: [row] });
	}

    if (interaction.commandName === 'ping') {
		const modal = new Modal()
			.setCustomId('myModal')
			.setTitle('Giveaway Master');

        const nameInput = new TextInputComponent()
			.setCustomId('nameInput')
			.setLabel("Enter name of Giveaway")
			.setStyle('SHORT');

        const numberInput = new TextInputComponent()
			.setCustomId('numberInput')
			.setLabel("Enter number of Winners")
			.setStyle('SHORT')   
            
        const timeInput = new TextInputComponent()
			.setCustomId('timeInput')
			.setLabel("Enter duration of Giveaway")
			.setStyle('SHORT')    

        const firstActionRow = new MessageActionRow().addComponents(nameInput);
        const secondActionRow = new MessageActionRow().addComponents(numberInput);
        const thirdActionRow = new MessageActionRow().addComponents(timeInput);            
        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

		await interaction.showModal(modal);
	}
});

client.on('messageCreate' , msg =>{
    if(msg.author.bot) return

    if(msg.channel.type == "dm") return


    if (msg.content == ".name"){
        msg.reply(msg.author.username);
    }
    });

client.login(process.env.TOKEN);