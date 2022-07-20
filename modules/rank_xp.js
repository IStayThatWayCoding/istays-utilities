const Discord = require('discord.js');
const mongo = require('../utils/mongoose');
const rankSchema = require('../models/rank_schem');
const path = require('path');
const mongoose = require('../utils/mongoose');
const xpLimit = new Set();

module.exports = async (message, bot) => {
    const guild = bot.guilds.cache.get('713668933433163827');
    const botChannel = guild.channels.cache.get('988686880889507890');
    const chatBotChannel = guild.channels.cache.get('996676151172943906');

    const disableXP = ['988686880889507890', '996676151172943906'];

    if (!message.author.bot && !xpLimit.has(message.author.id)) {
        await mongoose().then(async mongoose => {

            const sort = await rankSchema.find().catch(err => console.error(`${path.basename(__filename)} There was a problem finding a database entry: `, err));

            sortArr = [];
            for (const data of sort) {
                const {
                    id,
                    xp
                } = data;

                sortArr.push({
                    id,
                    xp
                });
            }

            sortArr.sort(function (a, b) {
                return b.xp - a.xp;
            });

            const results = await rankSchema.find({
                id: message.author.id
            }).catch(err => console.err(`${path.basename(__filename)} There was a problem finding a database entry: `, err))

            if (results.length === 0) {
                await rankSchema.findOneAndUpdate({
                    rank: 0,
                    id: message.author.id,
                    username: message.author.username,
                    discrim: message.author.discriminator,
                    avatar: message.author.avatar,
                    level: 0,
                    msgCount: 0,
                    xp: 0,
                    xxp: 0,
                    xxxp: 100
                }, {
                    rank: 0,
                    id: message.author.id,
                    username: message.author.username,
                    discrim: message.author.discriminator,
                    avatar: message.author.avatar,
                    level: 0,
                    msgCount: 0,
                    xp: 0,
                    xxp: 0,
                    xxxp: 100

                }, {
                    upsert: true
                }).catch(err => console.error(`${path.basename(__filename)} There was an issue updating a database entry: `, err));
            }

            if (disableXP.includes(message.channel.id)) return;

            function randomNum(min, max) {
                return Math.floor(Math.random() * (max - min - 1) + min);
            }

            for (const data of results) {
                let { xp, xxp, xxxp, level, msgCount} = data;

                
                let msgMath = parseInt(msgCount) + 1;
                // let random = randomNum(15, 25);
                let random = randomNum(45, 75)
                let xpMath =  parseInt(xp) + random;
                let xxpMath = parseInt(xxp) + random;

                let xxpInt = parseInt(xxp);
                let xxxpInt = parseInt(xxxp);
                let newUsername = message.author.username;
                let newDiscrim = message.author.discriminator;

                

                rankPosArr = [];
                for (let i = 0; i < sortArr.length; i++) {
                    await rankPosArr.push({
                        pos: i + 1,
                        id: sortArr[i].id,
                        xp: sortArr[i].xp
                    });
                }

                const findInArr = await rankPosArr.find(m => m.id === message.author.id);
                rankPos = findInArr.pos;

                await rankSchema.findOneAndUpdate({
                    id: message.author.id
                }, {
                    rank: rankPos,
                    username: newUsername,
                    discrim: newDiscrim,
                    avatar: message.author.avatar,
                    xp: xpMath,
                    xxp: xxpMath
                }, {
                    upsert: true
                }).catch(err => console.error(`${path.basename(__filename)} There was a problem updating a database entry: `, err));

                if (xxpMath > xxxpInt) {
                    let levelMath = parseInt(level) + 1;
                    let exponential = 5 * Math.pow(levelMath, 2) + (50 * levelMath) + 100 - 0;

                    let levelUpChannel = message.guild.channels.cache.get('988686871209070612')

                    let theEmbed = new Discord.MessageEmbed()
                    .setTitle("Level Up")
                    .setColor("RANDOM")
                    .setDescription(`${message.author} has leveled up to level **${levelMath}**!`)

                    levelUpChannel.send(theEmbed);
                    levelUpChannel.send(`<@${message.author.id}>`).then(m => m.delete({ timeout: 500 }))

                    await rankSchema.findOneAndUpdate({
                        id: message.author.id
                    }, {
                        level: levelMath,
                        xp: xpMath,
                        xxp: 0,
                        xxxp: exponential
                    }, {
                        upsert: true
                    }).catch(err => console.error(`${path.basename(__filename)} There was a problem updating a database entry: `, err));

                    

                    // let memberRole = guild.roles.cache.get('932725047737585684');
                    let lvl5 = guild.roles.cache.get('932729951675887637');
                    let lvl10 = guild.roles.cache.get('932729587526434866');
                    let lvl20 = guild.roles.cache.get('932729586830163968');
                    let lvl30 = guild.roles.cache.get('932729586263941130');
                    let lvl40 = guild.roles.cache.get('932729585613811732');
                    let lvl50 = guild.roles.cache.get('932728784942153798');
                    let lvl60 = guild.roles.cache.get('932728782962454550');

                    if (levelMath === 5) {
                        message.member.roles.add(lvl5)
                            .catch(err => console.error(`${path.basename(__filename)} There was a problem adding a role: `, err));


                        let embed = new Discord.MessageEmbed()
                            .setAuthor("IStay's Utilities", bot.user.avatarURL())
                            .setColor("RANDOM")
                            .setTitle("Level Reward!")
                            .setDescription("Hey there! You just unlocked a new level role! Information is below.")
                            .addField("Level Milestone:", "Level 5")
                            .addField("Role Unlocked:", `<@&${lvl5}>`)

                        message.author.send(embed);
                    }


                    if (levelMath === 10) {
                        message.member.roles.add(lvl10)
                            .catch(err => console.error(`${path.basename(__filename)} There was a problem adding a role: `, err));


                        let embed = new Discord.MessageEmbed()
                            .setAuthor("IStay's Utilities", bot.user.avatarURL())
                            .setColor("RANDOM")
                            .setTitle("Level Reward!")
                            .setDescription("Hey there! You just unlocked a new level role! Information is below.")
                            .addField("Level Milestone:", "Level 10")
                            .addField("Role Unlocked:", `<@&${lvl10}>`)

                        message.author.send(embed);
                    }

                    if (levelMath === 20) {
                        message.member.roles.add(lvl20)
                            .catch(err => console.error(`${path.basename(__filename)} There was a problem adding a role: `, err));


                        let embed = new Discord.MessageEmbed()
                            .setAuthor("IStay's Utilities", bot.user.avatarURL())
                            .setColor("RANDOM")
                            .setTitle("Level Reward!")
                            .setDescription("Hey there! You just unlocked a new level role! Information is below.")
                            .addField("Level Milestone:", "Level 20")
                            .addField("Role Unlocked:", `<@&${lvl20}>`)

                        message.author.send(embed);
                    }

                    if (levelMath === 30) {
                        message.member.roles.add(lvl30)
                            .catch(err => console.error(`${path.basename(__filename)} There was a problem adding a role: `, err));


                        let embed = new Discord.MessageEmbed()
                            .setAuthor("IStay's Utilities", bot.user.avatarURL())
                            .setColor("RANDOM")
                            .setTitle("Level Reward!")
                            .setDescription("Hey there! You just unlocked a new level role! Information is below.")
                            .addField("Level Milestone:", "Level 30")
                            .addField("Role Unlocked:", `<@&${lvl30}>`)

                        message.author.send(embed);
                    }

                    if (levelMath === 40) {
                        message.member.roles.add(lvl40)
                            .catch(err => console.error(`${path.basename(__filename)} There was a problem adding a role: `, err));


                        let embed = new Discord.MessageEmbed()
                            .setAuthor("IStay's Utilities", bot.user.avatarURL())
                            .setColor("RANDOM")
                            .setTitle("Level Reward!")
                            .setDescription("Hey there! You just unlocked a new level role! Information is below.")
                            .addField("Level Milestone:", "Level 40")
                            .addField("Role Unlocked:", `<@&${lvl40}>`)

                        message.author.send(embed);
                    }

                    if (levelMath === 50) {
                        message.member.roles.add(lvl50)
                            .catch(err => console.error(`${path.basename(__filename)} There was a problem adding a role: `, err));


                        let embed = new Discord.MessageEmbed()
                            .setAuthor("IStay's Utilities", bot.user.avatarURL())
                            .setColor("RANDOM")
                            .setTitle("Level Reward!")
                            .setDescription("Hey there! You just unlocked a new level role! Information is below.")
                            .addField("Level Milestone:", "Level 50")
                            .addField("Role Unlocked:", `<@&${lvl50}>`)

                        message.author.send(embed);
                    }

                    if (levelMath === 60) {
                        message.member.roles.add(lvl60)
                            .catch(err => console.error(`${path.basename(__filename)} There was a problem adding a role: `, err));


                        let embed = new Discord.MessageEmbed()
                            .setAuthor("IStay's Utilities", bot.user.avatarURL())
                            .setColor("RANDOM")
                            .setTitle("Level Reward!")
                            .setDescription("Hey there! You just unlocked a new level role! Information is below.")
                            .addField("Level Milestone:", "Level 60")
                            .addField("Role Unlocked:", `<@&${lvl60}>`)

                        message.author.send(embed);
                    }
                }
            }
        }).catch(err => console.error(`${path.basename(__filename)} There was a problem connecting to the database: `, err));

        // Limit
        xpLimit.add(message.author.id)

        setTimeout(() => {
            xpLimit.delete(message.author.id)
        }, 60000)
    }

    // Count messages towards the count (msgCount)

    await mongo().then(async mongoose => {
        const results = await rankSchema.find({
            id: message.author.id
        }).catch(err => console.error(`${path.basename(__filename)} There was a problem finding a database entry: `, err));

        for (const data of results) {
            let {
                msgCount
            } = data;

            let msgMath = parseInt(msgCount) + 1;

            console.log(msgCount);

            await rankSchema.findOneAndUpdate({
                id: message.author.id
            }, {
                msgCount: msgMath
            }, {
                upsert: true
            }).catch(err => console.error(`${path.basename(__filename)} There was a problem updating a database entry: `, err));
        }
    }).catch(err => console.error(`${path.basename(__filename)} There was a problem connecting to the database: `, err));
}