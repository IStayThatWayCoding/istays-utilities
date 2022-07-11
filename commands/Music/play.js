module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Music',
    description: 'Plays music specified',
    usage: `play <song>`,
    run: async (bot, message, args) => {

        if(!message.member.voice.channel) return;
        const music = args.join(" ")

        bot.distube.play(message.member.voice.channel, args.join(' ') , {
            message,
            textChannel: message.channel,
            member: message.member
        })
           
    }
}