//messageReaction, user

module.exports = (client, messageReaction, user) => {
	client.handler.handle(messageReaction, user)
}