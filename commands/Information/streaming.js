const Discord = require('discord.js')
const colors = require('../../colors.json')

module.exports = {
    name: 'streaming',
    aliases: ['str'],
    category: 'Information',
    description: 'Streaming Information',
    usage: `streaming`,
    run: async (bot, message, args) => {
        if (!message.member.roles.cache.has('992191733238595644')) return message.channel.send("You must have the <@&992191733238595644> role to use this command.")

        const embed = new Discord.MessageEmbed()
        .setTitle("Streaming Room Opened")
        .setColor(colors.red_light)
        .setDescription('ATTENTION EVERYONE - The streaming room has been opened because istay has decided to let people join on stream. In order to join, please ping istay (the owner) and he will let you in. Please remember that you will be on stream, and it is reccomennded that you have a decent mic!')

        message.channel.send(embed)
           
    }
}