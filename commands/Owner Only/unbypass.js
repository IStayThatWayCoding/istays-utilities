const Discord = require('discord.js');

module.exports = {
    name: 'unbypass',
    aliases: ['uby'],
    description: 'Removes the bypass role from a user.',
    usage: `bypass <@user>`,
    run: async (bot, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const role = message.guild.roles.cache.find(r => r.id == '994697390642712657');

        if (!message.member.roles.cache.has('992191733238595644')) return message.channel.send("You must have the <@&992191733238595644> role to use this command.")

        if(!user) return;
        if(!message.member.roles.cache.has('994697390642712657')) return;

       user.roles.remove(role);
       message.react("<a:CH_IconVoteYes:991970613113667614>");
       user.send(`You are no longer exempt from getting filtered in **${message.guild.name}**.`)


    }
}