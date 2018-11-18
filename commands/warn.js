const Discord = require('discord.js');
const config = require('../data/config.json');
const fs = require('fs');
const _ = require('lodash');
const moment = require('moment')

let warnings = require('../data/infractions/warnings.json');

function error(errtype, errmsg, msg) {
    errorEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setAuthor("Error!", "https://cdn.discordapp.com/attachments/465522565130223626/469665205870133248/unknown.png")
        .setDescription("**" + errtype + "**" + ": " + errmsg);
    msg.channel.send(errorEmbed);
}

function saveWarnings() {
    fs.writeFile("./data/infractions/warnings.json", JSON.stringify(warnings, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
    });
}

function checkAmount(user) {
    amount = 0
    if (warnings["users"][user] !== undefined) {
        return warnings["users"][user].length
    }
}

function addWarning(userid, reason) {
    newWarning = {
        reason,
        "time": moment()
    }
    if (warnings["users"][userid] !== undefined) {
        warnings["users"][userid].push(newWarning);
    } else {
        warnings["users"][userid] = [];
        warnings["users"][userid].push(newWarning);
    }
    saveWarnings();
}

function showWarnings(userid) {
    if (warnings["users"][userid] !== undefined) {
        return warnings["users"][userid]
    } else {
        return false
    }

}


exports.run = (client, message, args) => {
    // Adds a warning to a user
    // Example Syntax: ;warn add @Paradaux Being a silly goose

    if (args[0] === "add") {
        if (message.mentions.members.first().user.id === "") {
            message.reply("You can't warn this user");
            return;
        }
        let user = message.mentions.members.first().user
        let reason = "";
        for (i = 2; i <= args.length - 1; i++) {
            reason = reason + " " + (args[i]);
        }
        let warnedPMEmbed = new Discord.RichEmbed()
            .setColor(0x4793FF)
            .setAuthor("You have received a warning!", "https://cdn.discordapp.com/attachments/465522565130223626/469665205870133248/unknown.png")
            .setDescription("This has been archived against your user, please contact an administrator if you feel like this has been a mistake.\n You were warned by: `" + message.author.username + "` for: `" + reason + "`")
            .setTimestamp();
        let warnedPublicEmbed = new Discord.RichEmbed()
            .setColor(0x4793FF)
            .setAuthor(user.username + "#" + user.discriminator + " has been warned.", "https://cdn.discordapp.com/attachments/465523247572844575/476200604440592435/warning-36073_960_720.png")
            .setDescription("Issued by: `" + message.author.username + "` for: `" + reason + "`")
            .setTimestamp();

        user.send(warnedPMEmbed);
        message.channel.send(warnedPublicEmbed);
        addWarning(user.id, reason);
    }

    //
    else if (args[0] === "del") {
        message.reply("Please Contact **Paradaux#2864** Regarding the removal of warnings for now.")
    }

    //
    else if (args[0] === "show") {
        let user = message.mentions.members.first().user
        if (showWarnings(user.id) === false) {
            message.reply("**" + user.username + "#" + user.discriminator + "** hasn't been warned, thankfully.")
        } else {
            message.channel.send(JSON.stringify(showWarnings(user.id)));
        }
    }

    //
    else if (args[0] === "count") {
        let user = message.mentions.members.first().user
        no = checkAmount(user.id)
        if (no > 0) {
            message.reply("**" + user.username + "#" + user.discriminator + "** has been warned: `" + no + "` time(s)");
        } else {
            message.reply("**" + user.username + "#" + user.discriminator + "** hasn't been warned, thankfully.")
        }
    }

    //
    else {
        error("INVALID SYNTAX", "Command: `warn` requires the parameter `add`, `del` or `count`", message);
    }
}