const Discord = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const colors = require('../../colors.json');
const mutedRole = require('../Management/muteRole');
const moment = require('moment');

module.exports = {
    name: 'unmute',
    category: 'Moderation',
    description: 'Unmutes a muted user.. IMPORTANT: If you have a verified/member role that you want to add it back to them when you unmute them, run the MEMBERROLE command. To set your muted role, run the MUTEDROLE command.',
    usage: `unmute <@user> [reason]`,
    run: async (bot, message, args) => {

        

       

        const embed123 = new Discord.MessageEmbed()
        .setTitle("IMPORTANT")
        .setColor(colors.green_light)
        .setDescription("If you have a verified/member role that you want to remove from a user once you unmute them, run the MEMBERROLE command. To set your muted role, run the MUTEDROLE command.")
        
        const member = message.mentions.members.first();

        const guildDB = await Guild.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
        })

        const channel = guildDB.logChannelID;

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You are lacking the permission `MANAGE_MESSAGES`.')

        let MUTE_ROLE = guildDB.mutedRole
        let MEMBER_ROLE = guildDB.memberRole
        
        if(!member) return message.channel.send("User not specified. Please mention a member in this server, followed by the command.")
        if(!member.roles.cache.has(MUTE_ROLE)){
            message.channel.send("This user doesn't have the muted role!")
           } 
        





        if(args.length < 2) {
            member.roles.remove(MUTE_ROLE);
            member.roles.add(MEMBER_ROLE)

            
            let dateCreated = moment(message.createdAt)

            let dm = new Discord.MessageEmbed()
            .setColor("#49eb34")
            .setTitle(`${message.guild.name} - You've been unmuted`)
            .setAuthor("IStay's Utilities", bot.user.avatarURL())
            .setDescription(`Hello there! You have been unmuted in **${message.guild.name}**.`)
            .setFooter(dateCreated.format("MM/DD/YYYY"))

            member.send(dm)
            message.channel.send(`${member} was **unmuted!**`);
            if(!channel) {
                return
            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor(colors.aqua)
                    .setTitle('Unmuted')
                    .setThumbnail(member.user.avatarURL())
                    .addField('Username', `${member.user.username}`)
                    .addField('User ID', `${member.id}`)
                    .addField('Unmuted by:', `${(message.author)}`)
                    .addField('Reason', `No reason specified.`);

                    return bot.channels.cache.get(guildDB.logChannelID).send(embed);
            
        }

            } else {
                    member.roles.remove(MUTE_ROLE);
                    member.roles.add(MEMBER_ROLE);

                    if(member.roles.cache.has(MUTE_ROLE)){
                        message.channel.send(`${member} was **unmuted!**`);

                       } 
                    if(!channel) {
                        return
                    } else {
                        const embed = new Discord.MessageEmbed()
                            .setColor(colors.aqua)
                            .setTitle('User Unmuted')
                            .setThumbnail(member.user.avatarURL())
                            .addField('Username', `${member.user.username}`)
                            .addField('User ID', `${member.id}`)
                            .addField('Unmuted by:', `${(message.author)}`)
                            .addField('Reason', (args.slice(1).join(' ')));

                            return bot.channels.cache.get(guild.logChannelID).send(embed);
}

            }

        }

}