module.exports = {
    name: 'resume',
    category: 'Music',
    description: 'Resumes the music',
    usage: `resume`,
    run: async (bot, message, args) => {
        bot.distube.resume(message)


    }
}