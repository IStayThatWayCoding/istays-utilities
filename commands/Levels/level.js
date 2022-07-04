const Discord = require('discord.js');
const Levels = require('discord-xp');
const canvacord = require('canvacord');
const { normalizeUnits } = require('moment');

module.exports = {
    name: 'level',
    aliases: ['rank', 'xp'],
    category: 'Levels',
    description: 'Provides user level',
    usage: `level/rank/xp`,
    run: async (bot, message, args) => {
        // Goal: >level (@member)

        let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentionedMember) mentionedMember = message.member;

        const target = message.mentions.users.first() || bot.users.cache.get(args[0])|| message.author
        if (!target){
            target = message.author;
        }
        // if (!target) return message.channel.send('User has no levels!');

        const fonts = [
            {
                path: '../../Minecraft.ttf', face: { family: "Minecraft", weight: "regular", style: "normal"}
            }
        ]

        const user = await Levels.fetch(target.id, message.guild.id, true);
        const neededXp = Levels.xpFor(parseInt(user.level) + 1);
        if (!user) return message.reply("That user does not have any xp.");

        const img = "https://i.imgur.com/RpwzsQc.png";
    
        const rank = new canvacord.Rank()
        .setAvatar(target.displayAvatarURL({dynamic: false, format: 'png'}))
        .setBackground("IMAGE", img)
        .setCurrentXP(user.xp)
        .setLevel(user.level, true)
        .setLevelColor("#e30089", "#FFFFFF")
        .setRequiredXP(neededXp)
        .setRank(user.position)
        .setRankColor("#e30089", "#FFFFFF")
        .setStatus(target.presence.status)
        .setProgressBar("#920058", "COLOR")
        .setUsername(target.username)
        .setDiscriminator(target.discriminator)

        rank.registerFonts(fonts);

        await rank.build({ fontX: "Minecraft", fontY: "Minecraft"})
            .then(buffer => {
                const attachment = new Discord.MessageAttachment(buffer, "rankcard.png");
                message.channel.send(attachment);
            })
    
        // rank.build(fonts, "Minecraft")
        //     .then(buffer => {
        //         const attachment = new Discord.MessageAttachment(buffer, "rankcard.png");
        //         message.channel.send(attachment);
        //     });

        // let embed = new Discord.MessageEmbed()
        // .setAuthor("IStay's Utilities", bot.user.avatarURL())
        // .setTitle("User Level")
        // .setColor('RANDOM')
        // .setDescription(`**${mentionedMember.user.tag}** is level **${target.level}**\n\nXP Progress: **${target.xp}/${Levels.xpFor(target.level + 1)}**`);

        // try {
        //     message.channel.send(embed)
        // } catch (err) {
        //     console.log(err);
        // }
           
    }
}