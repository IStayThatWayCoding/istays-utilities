const Discord = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'stop',
    category: 'Music',
    description: 'Stops the music',
    usage: `stop`,
    run: async (bot, message, args) => {

        

        if(!message.member.voice.channel) return;
        bot.distube.stop(message)
        let embed = new Discord.MessageEmbed()
        .setColor(colors.MUSIC)
        .setDescription('Stopped the music!')
        message.channel.send(embed)


    }
}