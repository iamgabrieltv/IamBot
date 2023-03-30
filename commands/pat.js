const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('pat').setDescription('Give the cat some pats.'),
	async execute(interaction) {
		await interaction.reply('Puurrrrr...');
	},
};
