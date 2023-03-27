const { SlashCommandBuilder } = require('discord.js');
const hungyLevel = require('../hungyLevel');

module.exports = {
	data: new SlashCommandBuilder().setName('feed').setDescription('Give the cat some fishies! 🐟'),
	async execute(interaction) {
		if (hungyLevel.getLevel() >= 90) {
			if (hungyLevel.getLevel() <= 90) hungyLevel.updatePlus();

			interaction.reply(
				`Nom Nom... Thank you <@${interaction.member.id}>! *Hungylevel: ${hungyLevel.getLevel()}%*`,
			);
		} else if (hungyLevel.getLevel() <= 20) {
			if (hungyLevel.getLevel() <= 90) hungyLevel.updatePlus();

			interaction.reply(`I am starving! *Hungylevel: ${hungyLevel.getLevel()}%*`);
		} else if (hungyLevel.getLevel() <= 40) {
			if (hungyLevel.getLevel() <= 90) hungyLevel.updatePlus();

			interaction.reply(
				`I was starting to get hungy. Mau! *Hungylevel: ${hungyLevel.getLevel()}%*`,
			);
		}
	},
};
