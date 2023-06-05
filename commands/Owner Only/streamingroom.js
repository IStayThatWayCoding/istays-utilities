const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'streamingroom',
    aliases: ['stroom'],
    description: 'Gives access to Stream Room to a user!',
    usage: `streamingroom <user> <time>`,
    run: async (bot, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const role = message.guild.roles.cache.find(r => r.id == '1115140014377025617');
        const time = args[1];

        if (!message.member.roles.cache.has('992191733238595644')) return message.channel.send("You must have the <@&992191733238595644> role to use this command.")

        if(!user) return;
        if(!time) return message.channel.send("Pick a time!")
        if(!isNaN(time)) return message.channel.send('Invalid time format.')

        const istay = message.guild.members.cache.get('274021702411747328')

       user.roles.add(role);
       message.react("<a:CH_IconVoteYes:991970613113667614>");
       user.send(`You have been given access to **Streaming Room** in **${message.guild.name}** for ${time}.`)
        .catch(() => message.channel.send(`${user} has been given access to **Streaming Room** for ${time} *this message was sent because dms were off!*`))
       istay.send(`**LOG -** ${user} has been given access to **Streaming Room** for ${time}.`)

       setTimeout(() => {
        user.roles.remove(role)
       }, ms(time))



    }
}