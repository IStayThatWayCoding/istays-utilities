const Levels = require('discord-xp');

module.exports = {
    name: 'edit',
    aliases: ['change', 'modify'],
    category: 'Levels',
    description: 'Edits a user level/xp',
    usage: `edit`,
    run: async (bot, message, args) => {

        if(!message.member.roles.cache.has(process.env.BOTMASTER)){
            message.delete();
            return;
        }

        let usage = `${process.env.PREFIX}edit @user [xp, level] [add, set, remove] <num>`
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send(`Invalid syntax. \`${usage}\``);
        if (!mentionedMember) return message.channel.send(`Member doesn't exist.`)
        if (!args[1]) return message.channel.send(`Level or XP? \`${usage}\``);
        if (!['xp', 'level'].includes(args[1])) return message.channel.send(`Invalid XP/Level. \`${usage}\``);
        if (args[1] == 'xp') {
            if (!['add', 'set', 'remove'].includes(args[2])) return message.channel.send(`Adding, setting, or removing? \`${usage}\``);
            const value = Number(args[3]);
            const levelUser = await Levels.fetch(mentionedMember.user.id, message.guild.id);
            if (!levelUser) return message.channel.send(`User not registered.`)
            if (args[2] == 'add') {
                if (!value) return message.channel.send(`Invalid number.`);
                try {
                    await Levels.appendXp(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Added **${value}** xp to **${mentionedMember.user.tag}**`);
                } catch (err) {
                    console.log(err);
                }

            } else if (args[2] == 'remove') {
                if (!value) return message.channel.send(`Invalid number.`);
                try {
                    await Levels.subtractXp(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Removed **${value}** xp from **${mentionedMember.user.tag}**`);
                } catch (err) {
                    console.log(err);
                }

            } else if (args[2] == 'set') {
                if (!value) return message.channel.send(`Invalid number.`);
                try {
                    await Levels.setXp(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Set **${mentionedMember.user.tag}'s** xp to **${value}**`);
                } catch (err) {
                    console.log(err);
                }

            }
        } else if (args[1] == 'level') {
            if (!['add', 'set', 'remove'].includes(args[2])) return message.channel.send(`Adding, setting, or removing? \`${usage}\``);
            const value = Number(args[3]);
            const levelUser = await Levels.fetch(mentionedMember.user.id, message.guild.id);
            if (!levelUser) return message.channel.send(`User not registered.`)
            if (args[2] == 'add') {
                if (!value) return message.channel.send(`Invalid number.`);
                try {
                    await Levels.appendLevel(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Added **${value}** level(s) to **${mentionedMember.user.tag}**`);
                } catch (err) {
                    console.log(err);
                }

            } else if (args[2] == 'remove') {
                if (!value) return message.channel.send(`Invalid number.`);
                try {
                    await Levels.subtractLevel(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Removed **${value}** level(s) from **${mentionedMember.user.tag}**`);
                } catch (err) {
                    console.log(err);
                }

            } else if (args[2] == 'set') {
                if (!value) return message.channel.send(`Invalid number.`);
                try {
                    await Levels.setLevel(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Set **${mentionedMember.user.tag}'s** level(s) to **${value}**`);
                } catch (err) {
                    console.log(err);
                }

            }
        }

    }
}