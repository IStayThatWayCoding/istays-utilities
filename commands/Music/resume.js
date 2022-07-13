module.exports = {
    name: 'resume',
    category: 'Music',
    description: 'Resumes the music',
    usage: `resume`,
    run: async (bot, message, args) => {

        if(!message.member.voice.channel) return;

        if(message.member.voice.channel !== message.guild.me.voice.channel) return;

        if (!message.member.roles.cache.has('934227687306833950')) return message.channel.send("You must have the DJ role to use this command.")
        bot.distube.resume(message)


    }
}