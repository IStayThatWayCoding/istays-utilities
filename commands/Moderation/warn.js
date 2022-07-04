const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const colors = require('../../colors.json');
const moment = require('moment');

module.exports = {
    name: 'warn',
    aliases: ['w'],
    category: 'Moderation',
    description: 'Warns a user',
    usage: `warn <@user> [reason]`,
    run: async (bot, message, args) => {
        message.delete();

        const member = message.mentions.members.first();

        const guildDB = await Guild.findOne({
            guildID: message.guild.id
        }, async (err, Guild) => {
            if (err) console.error(err);
            if (!Guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

             //   return message.channel.send('This server was not in my database! I have added it, please retype this command.').then(m => m.delete({timeout: 10000}));
            }
        });
        

        const channel = guildDB.logChannelID;

        if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.channel.send('You are lacking the permission `MANAGE_MESSAGES`').then(m => m.delete({timeout: 5000}));

        if (!member)
            return message.channel.send('User not specified. Please mention a member in this server, followed by the command.').then(m => m.delete({timeout: 10000}));

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
                        warnCount: 1,
                        kickCount: 0,
                        banCount: 0,
                        tempBanCount: 0,
                        tempMuteCount: 0
                    })

                    await newUser.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
                } else {
                    user.updateOne({
                        warnCount: user.warnCount + 1
                    })
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
                }
            })

        if (args.length < 2) {

            let dateCreated = moment(message.createdAt)

            let dm = new MessageEmbed()
            .setColor("#FFFF00")
            .setTitle(`${message.guild.name} - You've been warned`)
            .setAuthor("IStay's Utilities", bot.user.avatarURL())
            .setDescription(`Hello there! You have been warned in **${message.guild.name}**. The information about your punishment is below.`)
            .addField("Reason", "No reason specified")
            .setFooter(dateCreated.format("MM/DD/YYYY"))

            member.send(dm);
            message.channel.send(`${member} was **warned**!`);
            if (!channel) {
                return
            } else {
                const embed = new MessageEmbed()
                    .setColor('#ffae00')
                    .setTitle('Warned')
                    .setThumbnail(member.user.avatarURL())
                    .addField('Username', `${member.user.username}`)
                    .addField('User ID', `${member.id}`)
                    .addField('Warned by:' `${(message.author)}`)
                    .addField('Reason', `No reason specified.`);

                    return bot.channels.cache.get(guild.logChannelID).send(embed);
            }
        } else {

            let dateCreated = moment(message.createdAt)

            let dm123 = new MessageEmbed()
            .setColor("#FFFF00")
            .setTitle(`${message.guild.name} - You've been warned`)
            .setAuthor("IStay's Utilities", bot.user.avatarURL())
            .setDescription(`Hello there! You have been warned in **${message.guild.name}**. The information about your punishment is below.`)
            .addField("Reason", `${(args.slice(1).join(' '))}`)
            .setFooter(dateCreated.format("MM/DD/YYYY"))

            member.send(dm123);
            message.channel.send(`${member} was **warned**!`);
            if (!channel) {
                return
            } else {
                const embed = new MessageEmbed()
                    .setColor('#ffae00')
                    .setTitle('Warned')
                    .setThumbnail(member.user.avatarURL())
                    .addField('Username', `${member.user.username}`)
                    .addField('User ID', `${member.id}`)
                    .addField('Warned by', `${(message.author)}`)
                    .addField('Reason', (args.slice(1).join(' ')));

                    return bot.channels.cache.get(guildDB.logChannelID).send(embed);
            }
        }
    }
}