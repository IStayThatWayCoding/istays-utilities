const Discord = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'volume',
    aliases: ['vo'],
    category: 'Music',
    description: 'Change the volume of the song(s)',
    usage: `volume <num 0-100>`,
    run: async (bot, message, args) => {

        if (!message.member.voice.channel) return;

        if (!message.member.roles.cache.has('934227687306833950')) return message.channel.send("You must have the DJ role to use this command.")
        bot.distube.setVolume(message, Number(args[0]));

        let embed = new Discord.MessageEmbed()
        .setColor(colors.MUSIC)
        .setDescription(`Volume set to \`${Number(args[0])}\``)
        
        message.channel.send(embed);

    }
}