const Discord = require('discord.js');
const colors = require('../../colors.json');


module.exports = {
    name: 'loop',
    aliases: ['repeat'],
    category: 'Music',
    description: 'Toggles loop on music',
    usage: `loop`,
    run: async (bot, message, args) => {

        if(!message.member.voice.channel) return;

        if(message.member.voice.chanenl !== message.guild.me.voice.channel) return;

        if (!message.member.roles.cache.has('934227687306833950')) return message.channel.send("You must have the DJ role to use this command.")
        const mode = bot.distube.setRepeatMode(message)
        let embed = new Discord.MessageEmbed()
        .setColor(colors.MUSIC)
        .setDescription(`Set repeat mode to \`${
            mode
                ? mode === 2
                    ? 'All Queue'
                    : 'This Song'
                : 'Off'
        }\`
        `,
        )

        message.channel.send(embed);

        // message.channel.send(
        //     `Set repeat mode to \`${
        //         mode
        //             ? mode === 2
        //                 ? 'All Queue'
        //                 : 'This Song'
        //             : 'Off'
        //     }\``,
        // )


    }
}