const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const moment = require('moment');
const config = require('../../config.json')

module.exports = {
    name: 'ban',
    category: 'Moderation',
    description: 'Bans the mentioned user from your server.',
    usage: `ban <@user> [reason]`,
    run: async (bot, message, args) => {
        message.delete();

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const guildDB = await Guild.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
            
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: config.prefix,
                    logChannelID: null
                });

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

        const logChannel = message.guild.channels.cache.get(guildDB.logChannelID);

        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.channel.send('You are lacking the permission `BAN_MEMBERS`').then(m => m.delete({timeout: 5000}));

        if (!member)
            return message.channel.send('User not specified. Please mention a member in this server, followed by the command.').then(m => m.delete({timeout: 5000}));

        if (!member.bannable)
            return message.channel.send('This member is not bannable.').then(m => m.delete({timeout: 5000}));

        if (message.member.roles.highest.position < member.roles.highest.position)
            return message.channel.send('You cannot ban someone with a higher role than you.').then(m => m.delete({timeout: 5000}));

        User.findOne({
            guildID: message.guild.id,
            userID: member.id
        }, async (err, user) => {
            if (err) console.error(err);

            if (!user) {
                const newUser = new User({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    userID: member.id,
                    muteCount: 0,
                    warnCount: 0,
                    kickCount: 0,
                    banCount: 1,
                    tempBanCount: 0,
                    tempMuteCount: 0
                });

                await newUser.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            } else {
                user.updateOne({
                    banCount: user.banCount + 1
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

        let reason = 'No reason specified';

        

        if (args.length > 1) reason = args.slice(1).join(' ');

        let dateCreated = moment(message.createdAt)

        let reasonDiscord = `${message.author.tag} - ${reason}`

        let dm = new MessageEmbed()
        .setColor("#ed1818")
        .setTitle(`${message.guild.name} - You've been banned`)
        .setAuthor("IStay's Utilities", bot.user.avatarURL())
        .setDescription(`Hello there! You have been banned in **${message.guild.name}**. The information about your punishment is below.`)
        .addField("Reason", reason)
        .addField("Duration", "Forever")
        .setFooter(dateCreated.format("MM/DD/YYYY"))

        member.send(dm);
        setTimeout(function(){
            member.ban({ reason: reasonDiscord });
        }, 500);
        message.channel.send(`${member} was **banned**!`);
        if (!logChannel) {
            return
        } else {
            const embed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('User Banned')
                .setThumbnail(member.user.avatarURL())
                .addField('Username', member.user.username)
                .addField('User ID', member.id)
                .addField('Banned by', message.author)
                .addField('Reason', reason);

            return logChannel.send(embed);
        };
    }
};