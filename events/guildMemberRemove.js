const Discord = require('discord.js');

module.exports = async (bot, member, guild, args) => {

    const user = member.user;

    let welcomeChannel = member.guild.channels.cache.get("991954203478081617");

    let anotherEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`**[LEAVE]** - <@${user.id}>`)

    await welcomeChannel.send(anotherEmbed);

    // var memberCount = user.guild.members.filter(member => !member.user.bot).size;

    // await bot.channels.cache.get('996713136465903677').setName(`🧑 Members: ${memberCount}`)
    // await bot.channels.cache.get('996713529832919100').setName(`🥇 Goal: ${memberCount}/50`)
}