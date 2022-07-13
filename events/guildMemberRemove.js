module.exports = async (bot, member, guild, args) => {

    const user = member.user;
    
    await bot.channels.cache.get('996713136465903677').setName(`🧑 Members: ${user.guild.memberCount}`)
    await bot.channels.cache.get('996713529832919100').setName(`🥇 Goal: ${member.guild.memberCount}/50`)
}