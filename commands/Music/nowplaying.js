const { MessageEmbed} = require('discord.js');
const bar = require('stylish-text');
const colors = require('../../colors.json');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'Music',
    description: 'Shows what song is currently playing.',
    usage: `nowplaying`,
    run: async (bot, message, args) => {
        if(!message.member.voice.channel) return;

        const queue = bot.distube.getQueue(message)

        function toReadableTime(given){
            var time = given;
            var minutes = "0" + Math.floor(time / 60);
            var seconds = "0" + (time - minutes * 60);
            return minutes.substring(-2) + ":" + seconds.substring(-2);
        }

        const current = Math.floor(queue.connection.dispatcher.streamTime / 1000)
        const end = queue.songs[0].length

        const value = (current * (100 / end) / 5)

        bar.default.full = "█";
        bar.default.exmpty = " - ";
        bar.default.start = "";
        bar.default.text = `${bar}`;

        let embed = new MessageEmbed()
        .setColor(colors.MUSIC)
        .setDescription(`${toReadableTime(current)} - [${bar.progress(20, value)}] - ${toReadableTime(end)}`)

        message.channel.send(embed);
           
    }
}