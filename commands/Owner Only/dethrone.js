const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'dethrone',
    aliases: ['dt'],
    description: 'Revokes access to IStays Throne from a user!',
    usage: `dethrone <user>`,
    run: async (bot, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const role = message.guild.roles.cache.find(r => r.id == '989052729538252820');
        
        if (!message.member.roles.cache.has('992191733238595644')) return message.channel.send("You must have the <@&992191733238595644> role to use this command.")

        if(!user) return;
        if(!user.roles.cache.has('989052729538252820')) return message.channel.send("This user doesn't have the throne access!")

        user.roles.remove(role);
        message.react("<a:CH_IconVoteYes:991970613113667614>");
        user.send(`Your access to **IStay's Throne** in **${message.guild.name}** has been revoked.`)
        .catch(() => message.channel.send(`${user} has been given access to **IStay's Throne** for ${time} *this message was sent because dms were off!*`))




    }
}