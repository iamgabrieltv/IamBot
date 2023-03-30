const { SlashCommandBuilder } = require('discord.js');
const hungyLevel = require('../hungyLevel');
const hour = new Date().getHours();

module.exports = {
	data: new SlashCommandBuilder().setName('feed').setDescription('Give the cat some fishies! 🐟'),
	async execute(interaction) {
		if (hour >= 8 && hour < 21) {
			if (hungyLevel.getLevel() <= 20) {
				if (hungyLevel.getLevel() <= 90 && hour >= 8 && hour < 21) hungyLevel.updatePlus();

				interaction.reply(`I am starving! *Hungylevel: ${hungyLevel.getLevel()}%*`);
			} else if (hungyLevel.getLevel() <= 40) {
				if (hungyLevel.getLevel() <= 90 && hour >= 8 && hour < 21) hungyLevel.updatePlus();

				interaction.reply(
					`I was starting to get hungy. Mau! *Hungylevel: ${hungyLevel.getLevel()}%*`,
				);
			} else if (hungyLevel.getLevel() <= 100) {
				if (hungyLevel.getLevel() <= 90 && hour >= 8 && hour < 21) hungyLevel.updatePlus();

				interaction.reply(
					`Nom Nom... Thank you <@${
						interaction.member.id
					}>! *Hungylevel: ${hungyLevel.getLevel()}%*`,
				);
			}
		} else {
			await interaction.reply({
				content: `The cat is sleeping right now <@${interaction.member.id}>`,
				ephemeral: true,
			});
		}
	},
};
