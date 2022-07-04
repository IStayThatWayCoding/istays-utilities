const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'throne',
    aliases: ['t'],
    description: 'Gives access to IStays Throne to a user!',
    usage: `throne <user> <time>`,
    run: async (bot, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const role = message.guild.roles.cache.find(r => r.id == '989052729538252820');
        const time = args[1];

        if (!message.member.roles.cache.has('992191733238595644')) return message.channel.send("You must have the <@&992191733238595644> role to use this command.")

        if(!user) return;
        if(!time) return message.channel.send("Pick a time!")
        if(!isNaN(time)) return message.channel.send('Invalid time format.')

       user.roles.add(role);
       message.react("<a:CH_IconVoteYes:991970613113667614>");

       setTimeout(() => {
        user.roles.remove(role)
       }, ms(time))



    }
}