const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Information',
    description: 'Help command',
    usage: `help`,
    run: async (bot, message, args) => {

        

        if(args[0]) {
            return getCMD(bot, message, args[0]);
        } else {
            return helpMSG(bot, message);
        }
        
    }
}

async function helpMSG(bot, message) {
    const embed = new Discord.MessageEmbed()
    .setColor("#8500FF")
    .setTitle(`${bot.user.username} - Help`)
    .setThumbnail(bot.user.avatarURL())
    .setDescription(`Server Prefix: \`${config.prefix}\`\n\nFor a full list of commands, please type \`${config.prefix}commands\` \n\nTo see more info about a specific command, please type \`${config.prefix}help <command>\` without the \`<>\``);
    

    message.channel.send(embed);


}

async function getCMD(bot, message, input) {
    const embed = new Discord.MessageEmbed()

    const cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));

    let info = `No information founds for command **${input.toLowerCase()}**.`;

    if (!cmd) {
        return message.channel.send(embed.setColor("#FFFFFF").setDescription(info));
    }

    if (cmd.name) info = `**Command Name**: ${cmd.name}`
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${config.prefix}${cmd.usage}`;
        embed.setFooter('<> = REQUIRED | [] = OPTIONAL')
    }
    if (cmd.usage2) info += `\n**Usage 2**: ${config.prefix}${cmd.usage2}`;

    return message.channel.send(embed.setColor("#CBC3E3").setDescription(info));
}
