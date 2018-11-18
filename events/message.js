const Discord = require('discord.js');
const config = require('../data/config.json');
const moment = require('moment')

let mutes = require('../data/infractions/mutes.json');



function isMuted(msg, userid, user) {
    if (mutes["users"][userid] !== undefined) {
        if (mutes["users"][userid]["isMuted"] === true) {
            msg.author.send("Sorry, you're currently muted, and thus cannot speak.")
            msg.delete()
            let emb = new Discord.RichEmbed()
                .setColor(0x4793FF)
                .setAuthor(msg.author.username + "#" + msg.author.discriminator + " is muted but tried to speak.", "https://cdn.discordapp.com/attachments/465523247572844575/476200604440592435/warning-36073_960_720.png")
                .setDescription("Issued by: `" + mutes["users"][userid]["issuer"] + "` for: `" + mutes["users"][userid]["reason"] + "`")
                .setTimestamp();
            msg.channel.send(emb)
            return true
        } else {
            return false
        }
        return false;
    }
}

module.exports = (client, message) => {
    console.log(`MSG: ${moment().format('h:mma')} ${message.author.username}: ${message.content}`)
    if (isMuted(message, message.author.id)) return;
    if (message.author.bot) return;
    if (message.content.indexOf(client.config.prefix) !== 0) return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd) {
        message.reply("That's an invalid command, buddy!")
        return;
    }
    cmd.run(client, message, args);
};