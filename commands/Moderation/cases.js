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
        const member = message.mentions.members.first();
        
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
                    tempMuteCount: 0
                })
                await newUser.save()
                .then(result => console.log(result))
               // .then(message.channel.send("Since this is the first time, I've just added this server to my database! If the command didn't work, please run that command again."))
                .catch(err => console.error(err));

                const embed = new MessageEmbed()
                    .setColor(colors.blue_dark)
                    .setTitle('Cases')
                    .setAuthor(member.user.username, member.user.avatarURL())
                    .addField('Mutes', newUser.muteCount)
                    .addField('Warns', newUser.warnCount)
                    .addField('Kicks', newUser.kickCount)
                    .addField('Bans', newUser.banCount)
                    .addField('Temp-Mutes', newUser.tempMuteCount);

                    return message.channel.send(embed);
            } else {

                const embed = new MessageEmbed()
                .setColor(colors.blue_dark)
                .setTitle('Cases')
                .setAuthor(member.user.username, member.user.avatarURL())
                .addField('Mutes', user.muteCount)
                .addField('Warns', user.warnCount)
                .addField('Kicks', user.kickCount)
                .addField('Bans', user.banCount)
                .addField('Temp-Mutes', user.tempMuteCount);

                return message.channel.send(embed);               
            }
        })
    }
}