const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const moment = require('moment');
const ms = require('ms');

module.exports = {
    name: 'tempban',
    category: 'Moderation',
    description: 'Temporarily bans the mentioned user from your server.',
    usage: `tempbanban <@user> <time> [reason]`,
    run: async (bot, message, args) => {
        message.delete();

        const member = message.mentions.members.first();

        const guildDB = await Guild.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
            
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX,
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
                    banCount: 0,
                    tempBanCount: 0,
                    tempMuteCount: 0
                });

                await newUser.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            } else {
                user.updateOne({
                    tempBanCount: user.tempBanCount + 1
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

        

        let time = args[1];
        if(!time) return message.channel.send("No time provided.")

        let reason = args.slice(2).join(' ');
        if(!reason) reason = "No reason specified"

        let dateCreated = moment(message.createdAt)

        let reasonDiscord = `${message.author.tag} - ${reason}`

        let dm = new MessageEmbed()
        .setColor("#ed1818")
        .setTitle(`${message.guild.name} - You've been banned`)
        .setAuthor("IStay's Utilities", bot.user.avatarURL())
        .setDescription(`Hello there! You have been banned in **${message.guild.name}**. The information about your punishment is below.`)
        .addField("Reason", reason)
        .addField("Duration", time)
        .setFooter(dateCreated.format("MM/DD/YYYY"))

        member.send(dm);
        member.ban({ reason: reasonDiscord });

        
        setTimeout(async function(){
            await message.guild.fetchBans().then(async bans => {
                if (bans.size == 0) return message.channel.send("No bans are in the guild!")
                let bannedUser = bans.find(b => b.user.id == member.id);
                if(!bannedUser) return console.log("Unbanned member");
                await message.guild.members.unban(bannedUser.user, reason).catch(err => console.log(err));

                logChannel.send(`**${member.id}** has been automatically unbanned after their temporary ban.`)
            });

        }, ms(time));
        message.channel.send(`${member} was **temp banned**!`);
        if (!logChannel) {
            return
        } else {
            const embed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('User Temporarily Banned')
                .setThumbnail(member.user.avatarURL())
                .addField('Username', member.user.username)
                .addField('User ID', member.id)
                .addField('Banned by', message.author)
                .addField('Reason', reason)
                .addField('Duration', time);

            return logChannel.send(embed);
        };
    }
};