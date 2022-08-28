const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const mongoose = require('mongoose');
const config = require('../../config.json')

module.exports = {
    name: 'modlog',
    category: 'Management',
    aliases: ['logs', 'modlogs', 'audit'],
    description: 'Sets the channel that moderation actions will be logged in.',
    usage: `modlog <#channel>`,
    run: async (bot, message) => {
        message.delete();

        if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

        const channel = await message.mentions.channels.first();

        if (!channel)
            return message.channel.send('I cannot find the specified channel. To do so, please mention a channel within this server.').then(m => m.delete({timeout: 5000}));

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
                    logChannelID: channel.id,
                });

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send(`The mod-logs channel has been set to ${channel}.`);
            } else {
                guild.updateOne({
                    logChannelID: channel.id
                })
                .then(result => console.log(result))
             //   .then(message.channel.send("Since this is the first time, I've just added this server to my database! If the command didn't work, please run that command again."))
                .catch(err => console.error(err));

                return message.channel.send(`The modlogs channel has been set to ${channel}.`);
            };
        });
    }
}