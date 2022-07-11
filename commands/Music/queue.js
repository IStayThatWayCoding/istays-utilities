const Discord = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    category: 'Music',
    description: 'Shows music queue',
    usage: `queue`,
    run: async (bot, message, args) => {

        if(!message.member.voice.channel) return;
        const queue = bot.distube.getQueue(message)
        if (!queue) {
            message.channel.send('Nothing playing right now!')
        } else {

            let embed = new Discord.MessageEmbed()
            .setTitle("Queue:")
            .setColor(colors.MUSIC)
            .setDescription(`${queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0 ,10).join('\n')}`);
            message.channel.send(embed);
        }

        // if (
        //     [
        //         '3d',
        //         'bassboost',
        //         'echo',
        //         'karaoke',
        //         'nightcore',
        //         'vaporwave',
        //     ].includes(message)
        // ) {
        //     const filter = distube.setFilter(message)
        //     message.channel.send(
        //         `Current queue filter: ${filter.join(', ') || 'Off'}`,
        //     )
        // }
           
     }
}