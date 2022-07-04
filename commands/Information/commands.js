const Discord = require('discord.js');
const { stripIndents } = require('common-tags')

module.exports = {
    name: "commands",
    aliases: ['c'],
    category: "Information",
    description: "Lists the commands",
    usage: `commands`,
    run: async (bot, message) => {

        if(!message.member.roles.cache.has("993437284655431720")) return;

        return getAll(bot, message)
    }
}

async function getAll(bot, message){
    const embed = new Discord.MessageEmbed()
    .setColor("#FFD700")
    .setTitle('Commands')
    .setThumbnail(bot.user.avatarURL())

    const commands = (category) => {
        return bot.commands
        .filter(cmd => cmd.category === category)
        .map(cmd => `- \`${(process.env.PREFIX) + cmd.name}\``)
        .join('\n');
    }

    const info = bot.categories
    .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(`1`)}** \n${commands(cat)}`)
    .reduce((string, category) => `${string}\n\n${category}`);

    return message.channel.send(embed.setDescription('Use `' + (`${process.env.PREFIX}help <commandName>\` without the \`<>\` to see more information about a specific command.\n\n${info}`)));
}