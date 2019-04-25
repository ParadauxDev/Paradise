const Discord = require('discord.js');
const infractionsAPI = require('../api/infractions.js')
const ms = require('ms')

exports.run = (client, message, args) => {

// message.guild.id, message.mentions.members.first().user.id, message.author.id, args.slice(2).join(' '), new Date())

//  CMD EXAMPLE: ;mute {user} {time} {reason}
// guildid, mutee, muter, reason
    
    let member = message.mentions.members.first();
    if (member == undefined) return message.channel.send("Invalid Syntax. Please see ;mute")
    if (args.length < 3) return message.channel.send("Invalid Syntax. Please see ;mute")
    memberID = member.id
	let time = ms(args[1])

	infractionsAPI.addMute(message.guild.id, memberID, message.author.id, args.slice(2).join(' '))

    setTimeout(function() {
		infractionsAPI.unMute(memberID);
	}, time);

}