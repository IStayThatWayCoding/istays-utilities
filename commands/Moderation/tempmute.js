const Discord = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
// const Settings = require('../../models/settings');
const colors = require('../../colors.json');
// const User = require('../../models/settings');
const ms = require('ms');
const moment = require('moment')
const { TimeoutError } = require('got/dist/source/core/utils/timed-out');

module.exports = {
    name: 'tempmute',
    aliases: ['tmute', 'tm'],
    category: 'Moderation',
    description: 'Temporarily mutes a mentioned user. IMPORTANT: If you have a verified/member role that you want to remove from a user once you mute them, run the MEMBERROLE command. To set your muted role, run the MUTEDROLE command.',
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
        
        


        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You are lacking the permission `MANAGE_MESSAGES`');

        if(!member) return message.channel.send('Please mention a user in the server.').then(m => m.delete({timeout: 10000}));

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
                    tempMuteCount: 1
                })

                await newUser.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            } else {
                user.updateOne({
                 tempMuteCount: user.tempMuteCount + 1
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));
            }
        })

        let time = args[1];
        if(!time) return message.channel.send("Specify a time!")

       let reason = args.slice(2).join(' ')
       if(!reason){
           reason = 'No reason specified'
       }

       let mutedRole = guildDB.mutedRole;
       let memberRole = guildDB.memberRole;


       member.roles.add(mutedRole)
       member.roles.remove(memberRole)

       setTimeout(function(){
        member.roles.remove(mutedRole)
        member.roles.add(memberRole)
        member.send(`Hey there! Your **${args[1]}** long mute in **${message.guild.name}** has expired!`)
        
       }, ms(time))

       let dateCreated = moment(message.createdAt)

       let dm = new Discord.MessageEmbed()
       .setColor("#FFA500")
       .setTitle(`${message.guild.name} - You've been muted`)
       .setAuthor("IStay's Utilities", bot.user.avatarURL())
       .setDescription(`Hello there! You have been muted in **${message.guild.name}**. The information about your punishment is below.`)
       .addField("Reason", reason)
       .addField("Duration", `${args[1]}`)
       .setFooter(dateCreated.format("MM/DD/YYYY"))

       member.send(dm);
       message.channel.send(`${member} was **muted**!`)
       if(!logChannel) {
           return;
       } else {
           const embed = new Discord.MessageEmbed()
           .setColor("#4A63C4")
           .setTitle("Temporarily Muted")
           .setThumbnail(member.user.avatarURL())
           .addField('Username', member.user.username)
           .addField('User ID', member.id)
           .addField('Moderator', `${(message.author)}`)
           .addField('Reason', reason)
           .addField('Duration', `${args[1]}`)
           .setFooter(dateCreated.format("MM/DD/YYYY"));

           return logChannel.send(embed);


       }
        }

    }