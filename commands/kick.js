const Discord = require('discord.js');
const config = require('../config.json');


let red = config.red;
let green = config.green;

exports.run = (client, message, args) => {

let kickUser = message.mentions.members.first();

let formatEmbed = new Discord.RichEmbed()
.setTitle('Invalid arguments')
.setColor(red)
.addField('Correct format:', '?kick <user> <reason>');

if(!kickUser) {
    message.channel.send(formatEmbed);
}

let reason = args.join(' ').slice(22);

    let kickEmbed = new Discord.RichEmbed()
    .setTitle('Kick')
    .setColor(green)
    .addField('Kicked user:', kickUser)
    .addField(`Kicked user's ID:`, kickUser.id)
    .addField('Kicked in:', message.channel)
    .addField('Kicker:', message.author)
    .addField(`Kicker's ID:`, kickUser.id)
    .addField('Kicked at:', message.createdAt);

    let moderationLogsChannel = message.guild.channels.find('name', 'moderation-logs');

    if(!moderationLogsChannel) {
        message.reply(`Please create a channel called: 'moderation-logs'`);
    }

    if(message.member.hasPermission('KICK_MEMBERS')) {
        kickUser.send(`You have been kicked from ${message.guild.name} for ${reason} and by: ${message.author}.`);
        kickUser.kick(reason).catch(err => {
            console.error(err);
            moderationLogsChannel.send(kickEmbed);
        });

    if(!message.member.hasPermission('KICK_MEMBERS')) {
        return message.reply('You need to have the kick members permission to kick that member.');
    }     
    
    }










}