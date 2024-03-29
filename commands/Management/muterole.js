const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const Users = require('../../models/user');
const mongoose = require('mongoose');
const config = require('../../config.json')

module.exports = {
    name: 'muterole',
    category: 'Management',
    aliases: ['mr', 'rolemuted'],
    description: 'Sets the role for a muted user.',
    usage: `muterole <@role>`,
    run: async (bot, message, args) => {
        message.delete();

        if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

        const channel = await message.mentions.roles.first();

        if (!channel)
            return message.channel.send('I cannot find the specified role. To do so, please mention a role in this server. As well as, make sure the bot role is ABOVE the muted role.').then(m => m.delete({timeout: 5000}));

        await Guild.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: config.prefix,
                    mutedRole: channel.id
                });

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send(`The muted role has been set to ${channel}. Also, please make sure my bot role is ABOVE the muted role.`);
            } else {
                guild.updateOne({
                    mutedRole: channel.id
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send(`The muted role has been set to ${channel}. Also, please make sure my bot role is ABOVE the muted role.`);
            };
        });
    }
}