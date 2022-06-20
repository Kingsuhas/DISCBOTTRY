const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent} = require('discord.js');

const dotenv = require('dotenv');

dotenv.config({path:"./.env"})

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready' , () => {
    console.log('GAbot is online');
});


client.on('interactionCreate', async interaction => {

    if (interaction.customId === 'first') {
        const nameResponse = interaction.fields.getTextInputValue('name');
        const numberResponse = interaction.fields.getTextInputValue('number');
        const timeResponse = interaction.fields.getTextInputValue('time');
        console.log(nameResponse,numberResponse,timeResponse)
        await interaction.reply({ content: 'Your submission was recieved successfully!' });
    }

	const { commandName } = interaction;

    if (interaction.commandName === 'ping') {
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