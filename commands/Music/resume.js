module.exports = {
    name: 'resume',
    category: 'Music',
    description: 'Resumes the music',
    usage: `resume`,
    run: async (bot, message, args) => {

        if(!message.member.voice.channel) return;

        if(message.member.voice.chanenl !== message.guild.me.voice.channel) return;
        bot.distube.resume(message)


    }
}