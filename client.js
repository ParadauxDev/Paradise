const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});
const config = require('./config.json');

client.on('message', message => {
  // Cleaned up this for you. ~ Paradaux

    if (!message.content.startsWith(config.prefix)) return;
    if (message.author.bot) return;

    let args = message.content.slice(config.prefix.length).trim().split(" ");
    let command = args.shift().toLowerCase();

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (e) {
        console.error(e.message);
    }
    
});

client.on('ready', () => {
    console.log(`${client.user.username} has just been started!`);
    client.user.setActivity('over Inspire', {type: 'WATCHING'});
});

client.login(config.token);