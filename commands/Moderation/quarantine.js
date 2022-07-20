const Discord = require('discord.js');
const mongoose = require('mongoose')
const mongo = require('../../utils/mongoose');
const moment = require('moment');
const ms = require('ms');
const User = require('../../models/user')
const Guild = require('../../models/guild');

module.exports = {
    name: 'quarantine',
    category: 'Moderation',
    description: 'Quarantines someone from the server. - ADMIN ONLY',
    usage: `quarantine <@user> <reason>`,
    run: async (bot, message, args) => {
        

        let qRole = message.guild.roles.cache.get("999166912766427137")

        message.delete();

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!message.member.roles.cache.has('932720790451945602')) return message.channel.send("You must have the **Admin** role to use this command.")

        const guildDB = await Guild.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);

            if(!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREIFX,
                    logChannelID: null
                });

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

        const logChannel = message.guild.channels.cache.get(guildDB.logChannelID);

        if(!message.member.hasPermission('BAN_MEMBERS'))
            return message.channel.send('You are lacking the permission `BAN_MEMBERS`').then(m => m.delete({ timeout: 5000 }));

            if(!member) 
                return message.channel.send('User not specified. Please mention a member in the server, followed by the command.').then(m => m.delete({ timeout: 5000 }));

            if(message.member.roles.highest.position < member.roles.highest.position)
                return message.channel.send('You cannot QUARANTINE someone with a higher role than you.').then(m => m.delete({ timeout: 5000 }));

            User.findOne({
                guildID: message.guild.id,
                userID: member.id
            }, async (err, user) => {
                if(err) console.error(err);

                if(!user) {
                    const newUser = new User({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        userID: member.id,
                        muteCount: 0,
                        warnCount: 0,
                        kickCount: 0,
                        banCount: 0,
                        tempBanCount: 0,
                        tempMuteCount: 0,
                        quarantineCount: 1
                    })

                    await newUser.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));

                } else {
                    user.updateOne({
                        quarantineCount: user.quarantineCount + 1
                    })
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
                }
            })

                let reason = args.slice(1).join(' ');
                if(!reason) reason = "No reason specified"

                let dateCreated = moment(message.createdAt)

                let dm = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle(`${message.guild.name} - You've been quarantined`)
                .setAuthor("IStay's Utilities", bot.user.avatarURL())
                .setDescription(`Hello, You have been quarantined in **${message.guild.name}** This means that you cannot see any channels in the server. Information is below.`)
                .addField("Reason", reason)
                .addField("Duration", "Forever / Until an Admin revokes")
                .setFooter(dateCreated.format("MM/DD/YYYY"))

                member.send(dm);
                setTimeout(function() {
                    member.roles.add(qRole)
                }, 500)
                message.channel.send(`${member} has been **quarantined**`);
                if(!logChannel) {
                    return
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle("USER QUARANTINED")
                        .setThumbnail(member.user.avatarURL())
                        .addField("Username", member.user.username)
                        .addField("User ID", member.id)
                        .addField("Quarantined by", message.author)
                        .addField('Reason', reason);

                        return logChannel.send(embed);
                }
                

             
           
    }
}