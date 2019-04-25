const Discord = require('discord.js');
const config = require('../data/config.json');
const moment = require('moment')

const fs = require('fs')

module.exports = (client, message) => {
    if (message.author.id === "459153951703564291") return;
    /* And the shit show beings*/

    console.log(`MSG: ${moment().format('h:mma')} ${message.author.username}: ${message.content}`)
    if (message.author.bot) return;
    if (message.content.indexOf(client.config.prefix) !== 0) return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    const adcmd = client.admincommands.get(command);
    const mdcmd = client.modcommands.get(command);
    if (cmd) {
        cmd.run(client, message, args);
    }
    else if (adcmd) {
        adcmd.run(client, message, args);
    }
    else if (mdcmd) {
        mdcmd.run(client, message, args);
    }
    else {
        message.reply("That's an invalid command, buddy!")
        return;        
    }
};