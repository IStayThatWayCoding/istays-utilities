const Discord = require("discord.js");

module.exports = {
    name: 'lock',
    aliases: ['l'],
    category: 'Moderation',
    description: 'Lock command',
    usage: `lock <reason>`,
    run: async (bot, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return;
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return;

        const role = message.guild.roles.cache.find(r => r.id =='932725047737585684');
        let lockChannel = message.channel;

        let reason = args.slice(0).join(' ');
        if(!reason) reason = "No reason specified."

        await lockChannel.updateOverwrite(role, {
            SEND_MESSAGES: false
        }).catch(err => console.log(err));
        message.channel.send("Channel locked.").then(m => m.delete({ timeout: 5000 }));

        let embed = new Discord.MessageEmbed()
        .setAuthor("IStay's Utilities", bot.user.avatarURL())
        .setTitle("Lockdown Activated")
        .setColor("#fc0303")
        .setDescription(`A lockdown for this channel has been issued.\n\nReason: ${reason}`);

        lockChannel.send(embed)
    }
}