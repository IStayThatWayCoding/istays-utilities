const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'say',
    aliases: ['repeat'],
    description: 'Repeats input of the user',
    category: 'Owner Only',
    usage: `say [embed] <message>`,

    run: (bot, message, args) => {
        message.delete()

        if (!message.member.roles.cache.has('992191733238595644')) return message.channel.send("You must have the <@&992191733238595644> role to use this command.")


        if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.channel.send('You are lacking the permission `MANAGE_MESSAGES`').then(m => m.delete({timeout: 5000}));
        
        if (args.length < 1)
            return message.channel.send('You must say saying to be repeated.').then(m => m.delete({timeout: 5000}));

        if (args[0].toLowerCase() === 'embed') {
            const embed = new MessageEmbed()
                .setColor("#FF69B4")
                .setDescription(args.slice(1).join(' '))

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(' '));
        }
    }
}