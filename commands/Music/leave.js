const Discord = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'leave',
    category: 'Music',
    description: 'Leaves the voice channel',
    usage: `leave`,
    run: async (bot, message, args) => {

        if(!message.member.voice.channel) return;

        if(message.member.voice.channel !== message.guild.me.voice.channel) return;

        if (!message.member.roles.cache.has('934227687306833950')) return message.channel.send("You must have the DJ role to use this command.")
        
        bot.distube.voices.get(message)?.leave()
        // let embed = new Discord.MessageEmbed()
        // .setColor(colors.MUSIC)
        // .setDescription("Disconnected from voice channel!")

        // message.channel.send(embed);

    }
}