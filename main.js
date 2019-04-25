const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./data/config.json");
// const fetch = require('node-fetch');


const RC = require('reaction-core')
client.handler = new RC.Handler()
client.config = config;

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);
    });
});

client.admincommands = new Enmap();
fs.readdir("./admincommands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./admincommands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command Admin Command: ${commandName}`);
        client.admincommands.set(commandName, props);
    });
});

client.modcommands = new Enmap();
fs.readdir("./modcommands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./modcommands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command Mod Command: ${commandName}`);
        client.modcommands.set(commandName, props);
    });
});

client.login(config.token);