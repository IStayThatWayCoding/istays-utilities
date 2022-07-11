module.exports = {
    name: 'leave',
    category: 'Music',
    description: 'Leaves the voice channel',
    usage: `leave`,
    run: async (bot, message, args) => {
        bot.distube.voices.get(message)?.leave()
        message.channel.send('Left the voice channel!')


    }
}