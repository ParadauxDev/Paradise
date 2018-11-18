const Discord = require('discord.js');
const config = require('../data/config.json');
const fs = require('fs');
const _ = require('lodash');
const moment = require('moment')

let mutes = require('../data/infractions/mutes.json');

function addMute(userid, reason) {}
function removeMute(userid) {}

//
function isMuted(msg, userid) {
    if (mutes["users"][userid]["isMuted"] === true) {
        msg.author.send("Sorry, you're currently muted, and thus cannot speak.")
        msg.delete()
        return true
    } else {
        return false
    }
}

function checkMutes() {}

exports.run = (client, message, args) => {
	message.reply("This command is yet to be implemented.")
}