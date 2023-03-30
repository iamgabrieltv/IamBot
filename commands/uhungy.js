const { SlashCommandBuilder } = require('discord.js');
const hungyLevel = require('../hungyLevel');

module.exports = {
	data: new SlashCommandBuilder().setName('uhungy').setDescription('Are u hungy??'),
	async execute(interaction) {
		await interaction.reply({
			content: `*Hungylevel: ${hungyLevel.getLevel()}*%`,
			ephemeral: true,
		});
	},
};
