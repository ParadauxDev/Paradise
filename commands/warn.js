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
    fs.writeFile("./data/infractions/warnings.json", JSON.stringify(infractions, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
    });
}

function gid() {
    function g4dID() {
        return Math.floor(1000 + Math.random() * 9000);
    }
    return g4dID() + "-" + g4dID() + "-" + g4dID() + "-" + g4dID();
}

function checkAmount(user) {
    amount = 0
    for (i = warnings.length; i <= 0; i--) {
        j = Object.values(warnings)
        if (j[0] == user) {
            amount++;
        }
    } 
    return amount
}

function addWarning(userid, issuerid, reason) {
    let warningid = gid()
    if (infractions[userid]) {
        infractions[userid]["warnings"][warningid] = {
            time: moment(),
            reason,
            issuerid
        }
    } else {
        infractions[userid] = {
            "warnings": {}
        }

        infractions[userid]["warnings"][warningid] = {

        }

        infractions[userid]["warnings"][warningid] = {
            time: moment(),
            reason,
            issuerid
        }
    }



    saveInfractions();
}

function removeWarning(userid, warningid) {
    console.log(infractions[userid]["warnings"])
    infractions[userid]["warnings"] = _.omit(infractions[userid]["warnings"], warningid);
    console.log(infractions[userid]["warnings"])
    saveInfractions();
}

exports.run = (client, message, args) => {
    // Adds a warning to a user
    // Example Syntax: ?warn add @Paradaux Being a silly goose

    if (args[0] === "add") {
        if (message.mentions.members.first().user.id === "150993042558418944") {
            message.reply("You can't warn this user");
            return;
        }
        let user = message.mentions.members.first().user
        let reason = "";
        for (i = 2; i <= args.length - 1; i++) {
            reason = reason + " " + (args[i]);
        }
        let warnedPMEmbed = new Discord.RichEmbed()
            .setColor(red)
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
        addWarning(user.id, message.author.id, reason);
    }

    //
    else if (args[0] === "del") {
        let user = message.mentions.members.first().user
        removeWarning(user.id, args[2])
        message.reply("Warning: `" + args[2] + "` has been **deleted**")
    }

    else if (args[0] === "show") {}

    //
    else if (args[0] === "count") {
        let user = message.mentions.members.first().user
        no = checkAmount(user.id)
        message.reply("**" + user.username + "#" + user.discriminator + "** has been warned: `" + no + "` times");

    }

    //
    else {
        error("INVALID SYNTAX", "Command: `warn` requires the parameter `add`, `del` or `count`", message);
    }
}