const Discord = require("discord.js");

module.exports = {
    name: 'unlock',
    aliases: ['ul'],
    category: 'Moderation',
    description: 'Unlock command',
    usage: `unlock`,
    run: async (bot, message, args) => {

        message.delete();

        
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return;
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return;

        const role = message.guild.roles.cache.find(r => r.id =='932725047737585684');
        let lockChannel = message.channel;

        await lockChannel.updateOverwrite(role, {
            SEND_MESSAGES: true
        }).catch(err => console.log(err));
        message.channel.send("Channel unlocked.").then(m => m.delete({ timeout: 5000 }));

        let embed = new Discord.MessageEmbed()
        .setAuthor("IStay's Utilities", bot.user.avatarURL())
        .setTitle("Lockdown Deactivated")
        .setColor("#66fc03")
        .setDescription(`The lockdown has now ended. Thanks for your cooperation.`);

        lockChannel.send(embed)
    }
}