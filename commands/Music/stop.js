const Discord = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'stop',
    category: 'Music',
    description: 'Stops the music',
    usage: `stop`,
    run: async (bot, message, args) => {

        if(message.member.voice.channel !== message.guild.me.voice.channel) return;

        if (!message.member.roles.cache.has('934227687306833950')) return message.channel.send("You must have the DJ role to use this command.")

        if(!message.member.voice.channel) return;
        bot.distube.stop(message)
        let embed = new Discord.MessageEmbed()
        .setColor(colors.MUSIC)
        .setDescription('Stopped the music!')
        message.channel.send(embed)


    }
}