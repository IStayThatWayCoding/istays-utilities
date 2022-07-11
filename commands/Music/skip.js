module.exports = {
    name: 'skip',
    category: 'Music',
    description: 'Skips the music',
    usage: `skip`,
    run: async (bot, message, args) => {
        bot.distube.skip(message)


    }
}