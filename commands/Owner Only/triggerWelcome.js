const Discord = require('discord.js');
const ws = require('ws');

module.exports = {
    name: 'triggerwelcome',
    description: 'Triggers guildMemberAdd',
    usage: `triggerwelcome`,
    run: async (bot, message, args) => {

        if (!message.member.roles.cache.has('992191733238595644')) return message.channel.send("You must have the <@&992191733238595644> role to use this command.")

        bot.emit("guildMemberAdd", message.member)
    }
}