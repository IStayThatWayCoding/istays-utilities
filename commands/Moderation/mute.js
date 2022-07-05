const Discord = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
// const Settings = require('../../models/settings');
const colors = require('../../colors.json');
// const User = require('../../models/settings');
const ms = require('ms');
const moment = require('moment');
const user = require('../../models/user');

module.exports = {
    name: 'mute',
    aliases: ['silence', 'm'],
    category: 'Moderation',
    description: 'Mutes a mentioned user. IMPORTANT: If you have a verified/member role that you want to remove from a user once you mute them, run the MEMBERROLE command. To set your muted role, run the MUTEDROLE command.',
    usage: `pmute`,
    run: async (bot, message, args) => {
        message.delete();



        // if(!mutedRole) return message.channel.send("In order to continue, run the `muterole` command. It is also encouraged to set a member role for the bot to remove upon mute and give upon unmute. This is the `memberrole` command, this is optional. ")



        const member = message.mentions.members.first();



        const guildDB = await Guild.findOne({
            guildID: message.guild.id,
        }, async (err, guild) => {
            if (err) console.error(err);
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    mutedRole: null,
                    memberRole: null,
                    logChannelID: null
                })

                newGuild.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));

            }
        });

        const logChannel = message.guild.channels.cache.get(guildDB.logChannelID)




        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You are lacking the permission `MANAGE_MESSAGES`');

        if (!member) return message.channel.send('Please mention a user in the server.').then(m => m.delete({
            timeout: 10000
        }));

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
                    muteCount: 1,
                    warnCount: 0,
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
                        muteCount: user.muteCount + 1
                    })
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
            }
        })

        let reason = args.slice(1).join(' ')
        if (!reason) {
            reason = 'No reason specified'
        }

        if (reason == "SPAM" || "spam") {
            reason = "Any form of spamming."

        }
        
        if(reason == "DIS" || "dis"){
            reason = "Disrespect towards another user."
        }
        //  else if (reason == "DIS" || "dis") {
        //     reason = "Disrespect towards another user."
        // } else if (reason == "RA" || "ra") {
        //     reason = "Racism"
        // } else if (reason == "NSFW" || "nsfw") {
        //     reason = "Explicit/NSFW content."
        // } else if (reason == "ADS" || "ads") {
        //     reason = "Advertisement of social platform/other"
        // } else if (reason == "ADS2" || "ads2") {
        //     reason = "Advertisement of Discord Server/other Discord related material"
        // } else if (reason == "LOW" || "low") {
        //     reason = "Low severity rule break.\n\nPossible reasoning:\n-Asking for things like nitro\n-Excessive Capital Characters\n-Inappropiate name/profile/behavior\n-Social links\n-Severe chat flood (example: message spamming 20 line long messages 5 times)\n-Use of soundboard\n-Any other minor rule. Try messaging a staff member if any of these do not match."
        // } else if (reason == "HIGH" || "high") {
        //     reason = "High severity rule break.\n\nPossible reasoning:\n-Filter bypassing\n-Harassment\n-Staff Disrespect\n-Mass pinging\n-Trolling\n-Abusive Behavior\n-Sexism\n-Scamming\n-Suicide References\n-Any other major rule. Try messaging a staff member if any of these do not match."
        // } else if (reason == "SEVERE" || "severe") {
        //     reason = "Very high severity rule break.\n\nPossible reasoning:\n-DM advertising\n-Doxxing / DDoS / Threats\n-Child Porn\n-Raiding\n-Sending viruses or corrupt files\n-Underage on Discord (under 13)\n-ToS Violation\n-Any other severe rule. Try messaging a staff member if any of these do not match. These are mainly non tolerable and a staff member may not reply."
        // } else if (reason == "OTHER" || "other") {
        //     reason = "Any rule has been broken that may have not fit other reasoning."
        // }




        let mutedRole = guildDB.mutedRole;
        let memberRole = guildDB.memberRole;


        member.roles.add(mutedRole)
        member.roles.remove(memberRole)

        let dateCreated = moment(message.createdAt)

        let dm = new Discord.MessageEmbed()
            .setColor("#FFA500")
            .setTitle(`${message.guild.name} - You've been muted`)
            .setAuthor("IStay's Utilities", bot.user.avatarURL())
            .setDescription(`Hello there! You have been muted in **${message.guild.name}**. The information about your punishment is below.`)
            .addField("Reason", reason)
            .addField("Duration", `Forever`)
            .setFooter(dateCreated.format("MM/DD/YYYY"))

        member.send(dm);
        message.channel.send(`${member} was **muted**!`)
        if (!logChannel) {
            return;
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(colors.blue_dark)
                .setTitle("Muted")
                .setThumbnail(member.user.avatarURL())
                .addField('Username', member.user.username)
                .addField('User ID', member.id)
                .addField('Moderator', `${(message.author)}`)
                .addField('Reason', reason)
                .setFooter(dateCreated.format("MM/DD/YYYY"));

            return logChannel.send(embed);


        }
    }

}