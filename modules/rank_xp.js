const Discord = require('discord.js');
const Levels = require('discord-xp');


module.exports = async (message, bot) => {

    const botChannel = message.guild.channels.cache.get('988686880889507890')
    const chatBotChannel = message.guild.channels.cache.get('996676151172943906')

    const disableXP = [botChannel, chatBotChannel]

    const randomXP = Math.floor(Math.random() * 29) + 1; // Gives a number between 1-30 for XP (make this higher for boosters)

    if(disableXP.includes(message.channel.id)) return;
    
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        let channel = message.member.guild.channels.cache.get("988686871209070612");

        let embed = new Discord.MessageEmbed()
        .setTitle("Level Up")
        .setColor("RANDOM")
        .setDescription(`${message.author} has leveled up to **${user.level}**!`)
        channel.send(embed);
        channel.send(`${message.author}`).then(msg => msg.delete({ timeout: 1000 }));

        if (user.level == 5) {
            let role = message.guild.roles.cache.find(r => r.id == "932729951675887637");

            let embed = new Discord.MessageEmbed()
                .setAuthor("IStay's Utilities", bot.user.avatarURL())
                .setColor("RANDOM")
                .setTitle("Level Reward!")
                .setDescription("Hey there! You just unlocked a new level role! Information is below.")
                .addField("Level Milestone:", user.level)
                .addField("Role Unlocked:", role.name)

            message.author.send(embed);

            if (message.member.roles.cache.has(role.id)) return;
            else await message.member.roles.add(role.id);
        }

        if (user.level == 10) {
            let role = message.guild.roles.cache.find(r => r.id == "932729587526434866");

            let embed = new Discord.MessageEmbed()
                .setAuthor("IStay's Utilities", bot.user.avatarURL())
                .setColor("RANDOM")
                .setTitle("Level Reward!")
                .setDescription("Hey there! You just unlocked a new level role! Information is below.")
                .addField("Level Milestone:", user.level)
                .addField("Role Unlocked:", role.name)

            message.author.send(embed);

            if (message.member.roles.cache.has(role.id)) return;
            else await message.member.roles.add(role.id);
        }

        if (user.level == 20) {
            let role = message.guild.roles.cache.find(r => r.id == "932729586830163968");

            let embed = new Discord.MessageEmbed()
                .setAuthor("IStay's Utilities", bot.user.avatarURL())
                .setColor("RANDOM")
                .setTitle("Level Reward!")
                .setDescription("Hey there! You just unlocked a new level role! Information is below.")
                .addField("Level Milestone:", user.level)
                .addField("Role Unlocked:", role.name)

            message.author.send(embed);

            if (message.member.roles.cache.has(role.id)) return;
            else await message.member.roles.add(role.id);
        }

        if (user.level == 30) {
            let role = message.guild.roles.cache.find(r => r.id == "932729586263941130");

            let embed = new Discord.MessageEmbed()
                .setAuthor("IStay's Utilities", bot.user.avatarURL())
                .setColor("RANDOM")
                .setTitle("Level Reward!")
                .setDescription("Hey there! You just unlocked a new level role! Information is below.")
                .addField("Level Milestone:", user.level)
                .addField("Role Unlocked:", role.name)

            message.author.send(embed);

            if (message.member.roles.cache.has(role.id)) return;
            else await message.member.roles.add(role.id);
        }

        if (user.level == 40) {
            let role = message.guild.roles.cache.find(r => r.id == "932729585613811732");

            let embed = new Discord.MessageEmbed()
                .setAuthor("IStay's Utilities", bot.user.avatarURL())
                .setColor("RANDOM")
                .setTitle("Level Reward!")
                .setDescription("Hey there! You just unlocked a new level role! Information is below.")
                .addField("Level Milestone:", user.level)
                .addField("Role Unlocked:", role.name)

            message.author.send(embed);

            if (message.member.roles.cache.has(role.id)) return;
            else await message.member.roles.add(role.id);
        }

        if (user.level == 50) {
            let role = message.guild.roles.cache.find(r => r.id == "932728784942153798");

            let embed = new Discord.MessageEmbed()
                .setAuthor("IStay's Utilities", bot.user.avatarURL())
                .setColor("RANDOM")
                .setTitle("Level Reward!")
                .setDescription("Hey there! You just unlocked a new level role! Information is below.")
                .addField("Level Milestone:", user.level)
                .addField("Role Unlocked:", role.name)

            message.author.send(embed);

            if (message.member.roles.cache.has(role.id)) return;
            else await message.member.roles.add(role.id);
        }

        if (user.level == 60) {
            let role = message.guild.roles.cache.find(r => r.id == "932728782962454550");

            let embed = new Discord.MessageEmbed()
                .setAuthor("IStay's Utilities", bot.user.avatarURL())
                .setColor("RANDOM")
                .setTitle("Level Reward!")
                .setDescription("Hey there! You just unlocked a new level role! Information is below.")
                .addField("Level Milestone:", user.level)
                .addField("Role Unlocked:", role.name)

            message.author.send(embed);

            if (message.member.roles.cache.has(role.id)) return;
            else await message.member.roles.add(role.id);
        }
    }
}