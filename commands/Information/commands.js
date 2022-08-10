const Discord = require('discord.js');
const { stripIndents } = require('common-tags')
const config = require('../../config.json')
const colors = require('../../colors.json')

module.exports = {
    name: "commands",
    aliases: ['c'],
    category: "Information",
    description: "Lists the commands",
    usage: `commands`,
    run: async (bot, message) => {

        

        return getAll(bot, message)
    }
}

async function getAll(bot, message){
    const embed = new Discord.MessageEmbed()
    .setColor(colors.MUSIC)
    .setTitle('Commands')
    .setThumbnail(bot.user.avatarURL())
    .setFooter(`${bot.user.username} - ${config.normal_footer}`)

    const commands = (category) => {
        return bot.commands
        .filter(cmd => cmd.category === category)
        .map(cmd => `- \`${(config.prefix) + cmd.name}\``)
        .join('\n');
    }

    const info = bot.categories
    .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(`1`)}** \n${commands(cat)}`)
    .reduce((string, category) => `${string}\n\n${category}`);

    return message.channel.send(embed.setDescription('Use `' + (`${config.prefix}help <commandName>\` without the \`<>\` to see more information about a specific command.\n\n${info}`)));
}
