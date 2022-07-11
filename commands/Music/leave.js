const Discord = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'leave',
    category: 'Music',
    description: 'Leaves the voice channel',
    usage: `leave`,
    run: async (bot, message, args) => {

        if(!message.member.voice.channel) return;
        
        bot.distube.voices.get(message)?.leave()
        // let embed = new Discord.MessageEmbed()
        // .setColor(colors.MUSIC)
        // .setDescription("Disconnected from voice channel!")

        // message.channel.send(embed);

    }
}