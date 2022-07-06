const Discord = require("discord.js");
const color = require("../colors.json")
const ms = require("ms")

module.exports = {
    name: 'lock',
    aliases: ['l'],
    category: 'Moderation',
    description: 'Locks a channel',
    usage: `lock <time> <reason>`,
    run: async (bot, message, args, guild) => {
        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

    
        if(!bot.lockit) bot.lockit = [];
    
    
      let time = args[0];
      let validUnlocks = ['release', 'unlock'];
      if(!time) return message.channel.send('No time!');
    
      let reason = args.slice(1).join(" ");
      if(!reason) return message.channel.send('No reason!')
    
    
        let lockdown = new Discord.RichEmbed()
        .setTitle("Lockdown Activated")
        .setColor(color.red_light)
        .setDescription(`Lockdown for this channel has been activated. \n\n Duration: ${time} \n\n Reason: ${reason}`)
        .setFooter(`Channel has been locked by ${message.author.username}`, message.author.displayAvatarURL)
    
        let lifted = new Discord.RichEmbed()
        .setTitle("Lockdown Lifted")
        .setColor(color.green_light)
        .setDescription(`Lockdown for this channel has been lifted.`)
    
    
        if(validUnlocks.includes(time)) {
            message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: false
            }).then(() => {
                message.channel.sendMessage(lifted);
                clearTimeout(bot.lockit[message.channel.id]);
                delete bot.lockit[message.channel.id];
            }).catch(error => {
                console.log(error);
            });
        } else {
            message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: false
            }).then(() => {
                message.channel.sendMessage(lockdown).then(() => {
                    bot.lockit[message.channel.id] = setTimeout(() => {
                        message.channel.overwritePermissions(message.guild.id, {
                            SEND_MESSAGES: true
                        }).then(message.channel.sendMessage(lifted)).catch(console.error);
                        delete bot.lockit[message.channel.id];
                    }, ms(time));
                }).catch(error => {
                    console.log(error)
                })
            })
        }
    }
           
    }