module.exports = {
    name: 'pause',
    category: 'Music',
    description: 'Pauses the music',
    usage: `pause`,
    run: async (bot, message, args) => {

        if(!message.member.voice.channel) return;
        bot.distube.pause(message)


    }
}