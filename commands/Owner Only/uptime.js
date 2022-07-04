const ms = require('ms');
const Discord = require('discord.js');

module.exports = {
    name: 'uptime',
    aliases: ['u'],
    description: 'Gives a description on the uptime of the bot',
    usage: `uptime`,
    run: async (bot, message, args) => {
        if (!message.member.roles.cache.has('992191733238595644')) return message.channel.send("You must have the <@&992191733238595644> role to use this command.")

    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    const embed = new Discord.MessageEmbed()
    .setTitle("Bot Uptime")
    .setColor("#FFA500")
    .setDescription(`**${bot.user.username}** has been up for **${days}** days, **${hours}** hours, **${minutes}** minutes, and **${seconds}** seconds.`)
    // .addField("Days", days)
    // .addField("Hours", hours)
    // .addField("Minutes", minutes)
    // .addField("Seconds", seconds)
 

    message.channel.send(embed);

        
        
    }
}