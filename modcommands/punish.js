const RC = require('reaction-core')

const punishButtons = [
  { emoji: '1⃣',
    run: (user, message) => {
    	message.channel.send("Punish menu is currently disabled due to `devmode: true`")
    }
  },
  { emoji: '2⃣',
    run: (user, message) => {
    	message.channel.send("Punish menu is currently disabled due to `devmode: true`")
    }
  },
  { emoji: '3⃣',
    run: (user, message) => {
    	message.channel.send("Punish menu is currently disabled due to `devmode: true`")
    }
  },
  { emoji: '4⃣',
    run: (user, message) => {
    	message.channel.send("Punish menu is currently disabled due to `devmode: true`")
    }
  }
]

exports.run = (client, message, args) => {
	if (!message.mentions.members.first()) return
	if (args.length < 2) return
	console.log(message.mentions.members.first())
	punishee = message.mentions.members.first()
	reason = args.slice(1).join(' ')
	let punishMenu = `
=== Processing Punishment for ${punishee.user.username} ===

1 :: Warn for ${reason}
2 :: Mute for 5 minutes for ${reason}
3 :: Kick for ${reason}
4 :: Ban for ${reason}

This menu is to be used to quickly and effectively hand down punishments.
Only the command issuer can activate its features.
`

let options  = {
  owner: message.author.id
}

	let changeColour = new RC.Menu("```asciidoc\n" + punishMenu + "```", punishButtons, options)
	client.handler.addMenus(changeColour);
	message.channel.sendMenu(changeColour);
}