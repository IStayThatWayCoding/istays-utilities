module.exports = {
    name: 'resume',
    category: 'Music',
    description: 'Resumes the music',
    usage: `resume`,
    run: async (bot, message, args) => {

        if(!message.member.voice.channel) return;
        bot.distube.resume(message)


    }
}