const Discord = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'volume',
    aliases: ['vo'],
    category: 'Music',
    description: 'Change the volume of the song(s)',
    usage: `volume <num 1-100>`,
    run: async (bot, message, args) => {

        if (!message.member.voice.channel) return;

        const volume = Number(args[0])

        if (!message.member.roles.cache.has('934227687306833950')) return message.channel.send("You must have the DJ role to use this command.")
        bot.distube.setVolume(message, volume);

        if (volume > 100 || volume < 1)
        return message.reply('the volume must be a number between 1 and 100');

        let embed = new Discord.MessageEmbed()
        .setColor(colors.MUSIC)
        .setDescription(`Volume set to \`${volume}\``)
        
        message.channel.send(embed);

    }
}