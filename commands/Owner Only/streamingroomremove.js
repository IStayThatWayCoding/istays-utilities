const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'streamingroomremove',
    aliases: ['stroomremove'],
    description: 'Revokes access to Stream Room to a user!',
    usage: `streamingroomremove <user>`,
    run: async (bot, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const role = message.guild.roles.cache.find(r => r.id == '1115140014377025617');

        if (!message.member.roles.cache.has('992191733238595644')) return message.channel.send("You must have the <@&992191733238595644> role to use this command.")

        if(!user) return;


        const istay = message.guild.members.cache.get('274021702411747328')

       user.roles.remove(role);
       message.react("<a:CH_IconVoteYes:991970613113667614>");
       user.send(`Your access **Streaming Room** in **${message.guild.name}** has been removed.`)
        .catch(() => message.channel.send(`${user}'s access to **Streaming Room** has been removed *this message was sent because dms were off!*`))
       istay.send(`**LOG -** ${user}'s access was revoked from **Streaming Room**.'`)



    }
}