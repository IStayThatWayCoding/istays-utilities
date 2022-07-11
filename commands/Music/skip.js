module.exports = {
    name: 'skip',
    category: 'Music',
    description: 'Skips the music',
    usage: `skip`,
    run: async (bot, message, args) => {
        if (!bot.distube.autoplay && bot.distube.songs.length == 1){
            bot.distube.stop(message)
        } else {
            bot.distube.skip(message)
        }


    }
}