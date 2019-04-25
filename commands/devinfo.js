var devinfo = `
=== Development Information ===

This is your one-stop-shop for Paradise news. 

LAST UPDATE: v0.5.6: Warn/Mute

New commands:
;ping :: Checks the API ping
;warn :: Warns a user. 
;adminsay :: Sends a message as the bot
;kick :: Kicks a user {Avoid use: Database logging not enabled for this command as of yet}
;ban :: Bans a user {Avoid use: Database logging not enabled for this command as of yet}
;devinfo :: You're right here, buddy

Changes to the codebase:
- No longer using json as a database (Whoop whoop)
We've moved to using MongoDB through Mongoose as seen in /api/infractions.js

- Changes to file structure
Moderator and Administrator commands are now kept in their specified, permission locked folders
(Well, perms haven't been added yet) in ./admincommands/ and ./modcommands/

- Fixed a copy/paste issue with our package.json and updated dependancies 


` 

exports.run = (client, message, args) => {
    message.channel.send("```asciidoc" + devinfo + "```")
}