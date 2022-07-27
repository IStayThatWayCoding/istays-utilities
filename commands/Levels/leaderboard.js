const Discord = require('discord.js');
const mongo = require('../../utils/mongoose');
const rankSchema = require('../../models/rank_schem');
const path = require('path');

module.exports = {
        name: 'leaderboard',
        aliases: ['lb'],
        category: 'Levels',
        description: 'Top 5 XP users!',
        usage: `level/rank/xp`,
        run: async (bot, message, args, guild) => {
                const response = new Discord.MessageEmbed()
                    .setColor('#32BEA6')
                    .setTimestamp()

                await mongo().then(async mongoose => {
                    const sort = await rankSchema.find({
                        rank: {
                            $gte: 1,
                            $lt: 50
                        }
                    }).catch(err => console.error(`${path.basename(__filename)} There was a problem finding a database entry: `, err));

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
                }).catch(err => console.error(`${path.basename(__filename)} There was a problem connecting to the database: `, err));

                sortArr.sort(function (a, b) {
                    return b.xp - a.xp;
                })

                function kFormatter(num) {
                    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000 * 1).toFixed(0)) + "K" : Math.sign(num) * Math.abs(num);
                }

                rankArr = [];
                for (let i = 0; i < sortArr.length; i++) {
                    let exists = message.guild.members.cache.get(sortArr[i].id);

                    if (exists) {
                        xpkFormat = kFormatter(sortArr[i].xp);
                        rankArr.push({ id: sortArr[i].id, xp: xpkFormat });
                    }
                }


            response.setDescription(`:trophy: \`IStay's Resort Leaderboard\`\n\n🥇 <@${rankArr[0].id}> - **${rankArr[0].xp}** XP\n🥈 <@${rankArr[1].id}> - **${rankArr[1].xp}** XP\n🥉 <@${rankArr[2].id}> - **${rankArr[2].xp}** XP\n\`4.\` <@${rankArr[3].id}> - **${rankArr[3].xp}** XP\n\`5.\` <@${rankArr[4].id}> - **${rankArr[4].xp}** XP`, false)

                // response.setDescription(`This command is currently unavailable. Please try again later.`)
            message.channel.send(response);

            }

        }
