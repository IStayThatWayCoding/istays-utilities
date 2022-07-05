const Discord = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    category: 'Levels',
    description: 'Top 5 XP users!',
    usage: `level/rank/xp`,
    run: async (bot, message, args) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);

        if (rawLeaderboard.length < 1) return message.reply("No one is in the leaderboard yet!");

        const leaderboard = await Levels.computeLeaderboard(bot, rawLeaderboard, true);

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}\n`); // We map the outputs.

        let lbembed = new Discord.MessageEmbed()
        .setAuthor("IStay's Utilities", bot.user.avatarURL())
        .setColor("RANDOM")
        .setTitle("Leaderboard")
        .setDescription(lb)

        message.channel.send(lbembed)

         // message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
}

}
