const Discord = require('discord.js');


module.exports = async (bot, oldMember, newMember) => {
    const channel = bot.channels.cache.get("988686823096209428");

    let embed1 = new Discord.MessageEmbed()
    .setTitle("Thanks for boosting!")
    .setColor("#FF69B4")
    .setDescription(`Hey there, ${newMember}! My epic gamer brain senses have detected that you just boosted **IStay's Resort!**\n\nThank you for boosting and you should have your perks in about **now**!`)
    .setFooter("NOTE: if you have boosted multiple times, i won't spam you!")

    let embed2 = new Discord.MessageEmbed()
    .setTitle("Server Booster!")
    .setColor("#FF69B4")
    .setDescription(`Holy crap! ${newMember} just boosted the server! Insane!`)
    .setFooter("if this user boosted multiple times, this message will only show once!")

    if(oldMember.roles.cache.size !== newMember.roles.cache.size){
        if (!oldMember.roles.cache.has('764323362813509673') && newMember.roles.cache.has('764323362813509673')){
            newMember.send(embed1);
            channel.send(embed2);
        }
    }

}