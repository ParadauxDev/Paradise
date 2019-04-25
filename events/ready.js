module.exports = (client) => {
    client.user.setPresence({ game: { name: 'with your emotions', type: 0 } });
}