module.exports = {
    name: 'pause',
    category: 'Music',
    description: 'Pauses the music',
    usage: `pause`,
    run: async (bot, message, args) => {
        bot.distube.pause(message)


    }
}