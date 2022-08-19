const { MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');
const User = require('../../models/user');
const colors = require("../../colors.json");

module.exports = {
    name: "cases",
    category: "Moderation",
    aliases: ['history'],
    description: "Gives a brief summary of a user's punishment count.",
    usage: `cases <@user>`,
    run: async (bot, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        
        if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.channel.send('You are lacking the permission `MANAGE_MESSAGES`').then(m => m.delete({timeout: 5000}));

        if (args.length < 0)
            return message.channel.send('User not specified. Please mention a member in this server, followed by the command.').then(m => m.delete({timeout: 5000}));

        if (!member)
            return message.channel.send('I cannot find the specified member. To do so, please mention a member in this server, followed by the command.').then(m => m.delete({timeout: 5000}));

        User.findOne({
            guildID: message.guild.id,
            userID: member.id
        }, async (err, user) => {
            if (err) console.error(err);
            if (!user) {
                const newUser = new User ({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    userID: member.id,
                    muteCount: 0,
                    warnCount: 0,
                    kickCount: 0,
                    banCount: 0,
                    tempBanCount: 0,
                    tempMuteCount: 0,
                    quarantineCount: 0,
                })
                await newUser.save()
                .then(result => console.log(result))
               // .then(message.channel.send("Since this is the first time, I've just added this server to my database! If the command didn't work, please run that command again."))
                .catch(err => console.error(err));

                const embed = new MessageEmbed()
                .setColor(colors.blue_dark)
                .setAuthor(`${member.user.username}'s History`, member.user.avatarURL())
                .addFields(
                    {name: 'Mutes', value: `${newUser.muteCount}`, inline: true},
                    {name: 'Warns', value: `${newUser.warnCount}`, inline: true},
                    {name: 'Kicks', value: `${newUser.kickCount}`, inline: true},
                    {name: 'Bans', value: `${newUser.banCount}`, inline: true},
                    {name: 'Temp-Mutes', value: `${newUser.tempMuteCount}`, inline: true},
                    {name: 'Temp-Bans', value: `${newUser.tempBanCount}`, inline: true},
                    {name: 'Quarantines', value: `${newUser.quarantineCount}`, inline: true},
                )
                .setTimestamp();

                    return message.channel.send(embed);
            } else {

                const embed = new MessageEmbed()
                .setColor(colors.blue_dark)
                .setAuthor(`${member.user.username}'s History`, member.user.avatarURL())
                .addFields(
                    {name: 'Mutes', value: `${user.muteCount}`, inline: true},
                    {name: 'Warns', value: `${user.warnCount}`, inline: true},
                    {name: 'Kicks', value: `${user.kickCount}`, inline: true},
                    {name: 'Bans', value: `${user.banCount}`, inline: true},
                    {name: 'Temp-Mutes', value: `${user.tempMuteCount}`, inline: true},
                    {name: 'Temp-Bans', value: `${user.tempBanCount}`, inline: true},
                    {name: 'Quarantines', value: `${user.quarantineCount}`, inline: true},
                )
                .setTimestamp();

                return message.channel.send(embed);               
            }
        })
    }
}