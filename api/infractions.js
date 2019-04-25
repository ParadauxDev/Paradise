// Mongoose has replaced mongodb here.
// /Users/User/Documents/Github/mongodb/bin/mongod.exe --dbpath /Users/User/Documents/Github/mongodb-data
const mongoose = require('mongoose');

/* 
This file is for purely managing database interactions for my moderation commands. 
Each moderation operation (i.e Warn, Mute, Kick, Ban, AdminNote) has their own section

=== Warn ===
addWarn()
getWarns()
removeWarn() { NOT FINISHED }

=== Mute === 
addMute()
unMute()
removeMute() { NOT FINISHED }
checkMute() { NOT FINISHED }

Kick/Ban/AdminNote are planned for 1.0 for are being skipped for now.

*/

mongoose.connect('mongodb://127.0.0.1:27017/infractions2', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const mutes = new mongoose.Schema ({
	guildid: String,
	mutee: String,
	muter: String,
	reason: String,
	status: Boolean,
	time: Date
})

const muteHistory = new mongoose.Schema ({
	guildid: String,
	mutee: String,
	muter: String,
	reason: String,
	time: Date
})

var muteModel = mongoose.model('mutes', mutes);
var muteHistoryModel = mongoose.model('mutehistory', mutes);

module.exports.addMute = (guildid, mutee, muter, reason) => {
	let newMute = new muteModel ({
		guildid: guildid,
		mutee: mutee,
		muter: muter,
		reason: reason,
		status: true,
		time: new Date()	
	})

	let newMuteHistory = new muteHistoryModel({
		guildid: guildid,
		mutee: mutee,
		muter: muter,
		reason: reason,
		time: new Date()
	})

	newMute.save().then((result) => {}).catch((error) => console.log(error))
	newMuteHistory.save().then((result) => {}).catch((error) => console.log(error))
}

module.exports.unMute = (userid) => {
	muteModel.findOneAndUpdate({ mutee: userid }, { status: false }).then((doc) => {
		console.log(doc);
	}).catch((err) => {
		console.log(err);
	}) 
}
module.exports.removeMute = () => {}
module.exports.checkMute = () => {}

// Warnee, Warner, Reason, Time
const warns = new mongoose.Schema({
	guildid: String,
	warnee: String,
	warner: String,
	reason: String,
	time: Date
})

var warnModel = mongoose.model('warns', warns);

module.exports.addWarn = (guildid, warnee, warner, reason) => {
	console.log("Triggered Function")
	let warnUser = new warnModel ({
		guildid: guildid,
		warnee: warnee,
		warner: warner,
		reason: reason,
		time : new Date()		
	})

	warnUser.save().then((result) => {
		console.log(result);
	}).catch((error) => {
		console.log(error);
	})
}
module.exports.getWarns = async (guildid, warnee) => {
	 try {
		return await warnModel.find({ guildid, warnee })
	} catch (e) {
		console.log(e)
	}
}
module.exports.removeWarn = () => {

}

const kicks = new mongoose.Schema({
	guildid: String,
	kickee: String,
	kicker: String,
	reason: String,
	time: Date
})

var kickModel = mongoose.model('kicks', kicks);

module.exports.addKick = () => {}
module.exports.removeKick = () => {}

const notes = new mongoose.Schema({
	guildid: String,
	concerning: String,
	addedby: String,
	description: String,
	time: Date
})

var noteModel = mongoose.model('notes', notes);
module.exports.addAdminNote = () => {}
module.exports.removeAdminNote = () => {}