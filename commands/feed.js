const { SlashCommandBuilder } = require('discord.js');
const hungyLevel = require('../hungyLevel');

module.exports = {
	data: new SlashCommandBuilder().setName('feed').setDescription('Give the cat some fishies! 🐟'),
	async execute(interaction) {
		switch (hungyLevel.getLevel()) {
			case hungyLevel.getLevel() >= 50:
				if (hungyLevel.getLevel() <= 90) hungyLevel.update();

				interaction.reply(
					`Nom Nom... Thank you <@${
						interaction.member.id
					}>! *Hungylevel: ${hungyLevel.getLevel()}%*`,
				);

				break;
			case hungyLevel.getLevel() <= 40:
				if (hungyLevel.getLevel() <= 90) hungyLevel.update();

				interaction.reply(
					`I was starting to get hungy. Mau! *Hungylevel: ${hungyLevel.getLevel()}%*`,
				);

				break;

			case hungyLevel.getLevel() <= 20:
				if (hungyLevel.getLevel() <= 90) hungyLevel.update();

				interaction.reply(`I am starving! *Hungylevel: ${hungyLevel.getLevel()}%*`);

				break;
		}
	},
};
