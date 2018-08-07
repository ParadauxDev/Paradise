const Discord = require('discord.js');
const config = require('../config.json');
const fs = require('fs');
const _ = require('lodash');
const moment = require('moment')
let infractions = require('../data/infractions.json');
let red = config.red;
let green = config.green;


exports.run = (client, message, args) => {

	if (args[0] === "showinfractions") {
		message.channel.send("```" + JSON.stringify(infractions, null, 4) + "```");
	}


}