var Help = `
==== Paradise » Planned Features ==== 

Currently Paradise is in heavy development and is only available on select 'Beta' testing
guilds. Because of this please do not rely too heavily on its features and have a backup 
moderation bot such as Dyno at hand. This bot will be offline for long stretches of time as
it is being developed and certain commands may be broken. Thanks for your continued patience
during the development process,

Regards,
Paradaux#2864 » Development Lead

== Planned Features ==

Inter-server Player report lookups 
Cross-guild punishments for large-multiserver networks
Guild Configuration Backup should an admin fuck it all up

== Currently Working/ Almost Ready Features ==

;warn :: This sort of works, it's a bit iffy atm as we switch over to mongodb
;mute :: is still in development. Requires us finishing switch to mongo


More to come, request features by PMing the bot (don't yet actually, that isn't working either lmao).
`

exports.run = (client, message, args) => {
    message.channel.send("```asciidoc" + Help + "```")
}