const Discord = require('discord.js');
const mongoose = require('mongoose')
const mongo = require('../../utils/mongoose');
const moment = require('moment');
const ms = require('ms');
const User = require('../../models/user')
const Guild = require('../../models/guild');

module.exports = {
    name: 'unquarantine',
    category: 'Moderation',
    description: 'Unqarantines someone from the server. - ADMIN ONLY',
    usage: `unquarantine <@user> <reason>`,
    run: async (bot, message, args) => {
        if (!message.member.roles.cache.has('932720790451945602')) return message.channel.send("You must have the **Admin** role to use this command.")

        

        let qRole = message.guild.roles.cache.get("999166912766427137")
        let vRole = message.guild.roles.cache.get("932725047737585684")
        let div1 = message.guild.roles.cache.get("932731261875810354")
        let div2 = message.guild.roles.cache.get("932725365586153482")
        let div3 = message.guild.roles.cache.get("932813423794855956")
        let div4 = message.guild.roles.cache.get("932722368932094012")

        message.delete();

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

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
                return message.channel.send('User not specified. Please mention a member in the server, followed by the command. You may need to use ID for this command.').then(m => m.delete({ timeout: 5000 }));


                let dateCreated = moment(message.createdAt)

                let dm = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle(`${message.guild.name} - You've been unquarantined!`)
                .setAuthor("IStay's Utilities", bot.user.avatarURL())
                .setDescription(`Hello, You have been unquarantined in **${message.guild.name}**!`)
                .setFooter(dateCreated.format("MM/DD/YYYY"))

                member.send(dm);
                await member.roles.add(div1);
                await member.roles.add(div2);
                await member.roles.add(div3);
                await member.roles.add(div4);
                setTimeout(function() {
                    member.roles.remove(qRole);
                    member.roles.add(vRole);
                }, 500)
                message.channel.send(`${member} has been **unquarantined**`);
                if(!logChannel) {
                    return
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle("USER UNQUARANTINED")
                        .setThumbnail(member.user.avatarURL())
                        .addField("Username", member.user.username)
                        .addField("User ID", member.id)
                        .addField("Unquarantined by", message.author)

                        return logChannel.send(embed);
                }
                

             
           
    }
}