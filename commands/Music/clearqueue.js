const Discord = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'clearqueue',
    aliases: ['cq'],
    category: 'Music',
    description: 'Clears the queue!',
    usage: `leave`,
    run: async (bot, message, args) => {

        if(!message.member.voice.channel) return;

        if(message.member.voice.channel !== message.guild.me.voice.channel) return;

        if (!message.member.roles.cache.has('934227687306833950')) return message.channel.send("You must have the DJ role to use this command.")

        
        
        let queue = bot.distube.getQueue(message)

        if (!queue.autoplay && queue.songs.length <= 1) return message.channel.send('Can\'t clear queue!').then(m => m.delete({ timeout: 5000 }));

        queue.songs.splice(0, queue.songs.length - 1)

        let embed = new Discord.MessageEmbed()
        .setColor(colors.MUSIC)
        .setDescription("Successfully cleared the queue!")

        message.channel.send(embed);

    }
}