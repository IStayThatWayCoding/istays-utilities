module.exports = {
    name: 'pause',
    category: 'Music',
    description: 'Pauses the music',
    usage: `pause`,
    run: async (bot, message, args) => {


        
        if(!message.member.voice.channel) return;

        if(message.member.voice.channel !== message.guild.me.voice.channel) return;

        if (!message.member.roles.cache.has('934227687306833950')) return message.channel.send("You must have the DJ role to use this command.")

        bot.distube.pause(message)


    }
}