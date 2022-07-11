module.exports = {
    name: 'volume',
    aliases: ['vo'],
    category: 'Music',
    description: 'Change the volume of the song(s)',
    usage: `volume <num 0-100>`,
    run: async (bot, message, args) => {
        bot.distube.setVolume(message, Number(args[0]));
        message.channel.send(`Volume set to \`${Number(args[0])}\``)
           
    }
}