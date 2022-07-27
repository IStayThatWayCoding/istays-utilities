const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'whois',
    aliases: ['userinfo'],
    category: 'Information',
    description: 'Displays info about the mentioned user.',
    usage: `whois <@user>`,
    run: async (bot, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!member)
            member = message.author;

        const embed = new MessageEmbed()
            .setColor(colors.blue_light)
            .setAuthor(member.user.username)
            .setThumbnail(member.user.avatarURL())
            .setDescription(`Here is some information I found for ${member}`)
            .addField('User ID', member.user.id)
            .addField('Account created at', member.user.createdAt)
            .addField('Joined server at', member.joinedAt)
            .addField('Highest role', member.roles.highest)
            .addField('All roles', member.roles.cache.map(r => `${r}`).join(' | '));

        return message.channel.send(embed).catch(err => console.error(err));
    }
}