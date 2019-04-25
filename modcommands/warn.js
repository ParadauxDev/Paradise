const Discord = require('discord.js');
const infractionsAPI = require('../api/infractions.js')

warnDocs = `
=== Incorrect Syntax! ===

;warn add @mention reason :: Warns @mention for the specified reason
;warn check @mention :: Returns a list of all the warnings a user has received 
;warn remove <GUID> :: Removes a specified warning by its Global Unique ID 

===   --  < | >  --   ===
`

//guildid, warnee, warner, reason, time

exports.run = async (client, message, args) => {
    if (args[0] === "add") {
        infractionsAPI.addWarn(message.guild.id, message.mentions.members.first().user.id, message.author.id, args.slice(2).join(' '), new Date())
    } else if (args[0] === "remove") {

        } else if (args[0] === "check") {
            let Warns = await infractionsAPI.getWarns(message.guild.id, message.mentions.members.first().user.id)
            let userWarns = "```asciidoc\n"
            i = 0
            Warns.forEach((index) => {
                i = i + 1
                userWarns += i + `. Issuer :: ${index.warner}\n Reason :: ` + index.reason + "\n Warn GUID :: " + index._id + "\n"
            });
            message.channel.send(userWarns + "\nYou will need to use the GUID specified to delete a warning. see ;warn for more details```");
    } else {
        message.channel.send("```asciidoc" + warnDocs + "```")
    }
}