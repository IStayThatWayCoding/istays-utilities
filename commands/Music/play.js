module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Music',
    description: 'Plays music specified',
    usage: `play <song>`,
    run: async (bot, message, args) => {
        const music = args.join(" ")

        bot.distube.play(message, music)
           
    }
}