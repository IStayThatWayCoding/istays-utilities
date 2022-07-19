const Discord = require('discord.js');
const ws = require('ws');

module.exports = {
    name: 'ping',
    description: 'Returns bot and API latency in milliseconds',
    category: 'Owner Only',
    usage: `ping`,
    run: async (bot, message, args) => {

        if (!message.member.roles.cache.has('992191733238595644')) return message.channel.send("You must have the <@&992191733238595644> role to use this command.")

        console.log(parseInt('0'));

        const msg = await message.channel.send('🏓 Pinging...').then(m => m.delete({timeout: 100}));
        
        const embed = new Discord.MessageEmbed()
        .setColor("#322D80")
        .setTitle("🏓 Pong!")
        .setDescription(`Bot Latency is **${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms** \nAPI Latency is **${Math.round(bot.ws.ping)} ms**`);

        message.channel.send(embed);
        message.delete();
    }
}