const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const hungyLevel = require('./hungyLevel');

const { TOKEN, GUILD_ID } = process.env;
const { randomInt } = require('crypto');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(
			`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
		);
	}
}

// function meow() {
// 	const p = randomInt(19);
// 	const channel = client.channels.cache.get('1088818573142663262');
// 	const hour = new Date().getHours();

// 	if (p == 0 && hour >= 8 && hour < 21) {
// 		const p1 = randomInt(2);

// 		switch (p1) {
// 			case 0:
// 				channel.send('Meow!');
// 				break;
// 			case 1:
// 				channel.send('Miiiaaauuuuuuu...');
// 				break;
// 			case 2:
// 				channel.send('Mau!');
// 				break;
// 		}
// 	}
// }

function updatePresence() {
	const guild = client.guilds.cache.get(GUILD_ID);
	const memberCount = guild.memberCount;
	const hour = new Date().getHours();

	if (hour >= 8 && hour < 21) {
		// loop through the members and count the bots
		let botCount = 0;

		guild.members.fetch().then((fetchedMembers) => {
			fetchedMembers.forEach((member) => {
				if (member.user.bot) botCount++;
			});

			// Set Activity

			client.user.setPresence({
				activities: [
					{ name: `over ${memberCount - botCount} Hoomans`, type: ActivityType.Watching },
				],
				status: 'online',
			});
		});
	} else {
		// Set Activity

		client.user.setPresence({
			activities: [{ name: 'dreaming about fishies 🐟', type: ActivityType.Playing }],
			status: 'idle',
		});
	}
}

function checkOnCat() {
	const guild = client.guilds.cache.get(GUILD_ID);
	const channel = client.channels.cache.get('1088866752395489330');
	const hour = new Date().getHours();
	let ranMemberId = 0;

	guild.members.fetch().then((fetchedMembers) => {
		for (let isBot = true; isBot == true; ) {
			const p = fetchedMembers.random();
			isBot = p.user.bot;
			ranMemberId = p.user.id;
		}

		if (hour >= 8 && hour < 21 && hungyLevel.getLevel() >= 10) {
			if (hungyLevel.getLevel() <= 20) {
				channel.send(
					`I'm getting really hungry, @everyone. >:( *Hungylevel: ${hungyLevel.getLevel()}%*`,
				);
			} else if (hungyLevel.getLevel() <= 40) {
				channel.send(
					`I'm starting to feel hungy :(. Please` +
						'`/feed` ' +
						`me <@${ranMemberId}> *Hungylevel: ${hungyLevel.getLevel()}%*`,
				);
			}
		}
	});
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

	// Run various events on Ready

	updatePresence();

	// meow();

	checkOnCat();

	setTimeout(() => {
		const guild = client.guilds.cache.get(GUILD_ID);
		const members = guild.members.fetch();
	}, 5000);

	// Set intervals for various events

	// setInterval(meow, 60000);

	setInterval(updatePresence, 300000);

	// setInterval(hungyLevel.update, 3600000);

	setInterval(checkOnCat, 1800000);
});

// Welcome message

client.on(Events.GuildMemberAdd, async (member) => {
	const welcomeChannel = client.channels.cache.get('1088826270130896988');
	welcomeChannel.send(
		`Welcome, <@${member.id}>! <a:peepohey:1088902218972930190> Go get your roles in the **Customize** tab of <id:browse> to access more parts of the server!`,
	);

	updatePresence();
});

// Log in to Discord with your client's token
client.login(TOKEN);

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	}
});
