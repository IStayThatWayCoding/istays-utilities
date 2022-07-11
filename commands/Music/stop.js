module.exports = {
    name: 'stop',
    category: 'Music',
    description: 'Stops the music',
    usage: `stop`,
    run: async (bot, message, args) => {

        if(!message.member.voice.channel) return;
        bot.distube.stop(message)
        message.channel.send('Stopped the music!')


    }
}