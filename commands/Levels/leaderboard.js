const Discord = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    category: 'Levels',
    description: 'Top 5 XP users!',
    usage: `level/rank/xp`,
    run: async (bot, message, args) => {

        let number = 0;
        const Users = await Levels.fetch(target.id, message.guild.id, true);
        let user = await Users.find({ guildId: message.channel.guild.id });
        user = user.sort((a, b) => b.level - a.level);
        let array = [];
        
        for (const u of user) {
            array.push({
                user: this.bot.users.get(u.userId),
                level: u.level,
                xp: u.xp,
                pos: (user.findIndex(i => i.id === u.id) + 1)
            });
        }
        
        array = array.slice(0, 5);
        
        // canvas
        const canvas = Canvas.createCanvas(500, 700);
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = "#1f1e1e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#242424";
        ctx.fillRect(12, 12, 476, 676);
        
        // users
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.font = '40px Bold';
        ctx.fillText('Leaderboard', canvas.width / 2, 100);
        
        for (const u of array) {
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.font = '25px Bold';
            ctx.fillText(`${u.pos}. ${u.user.username}#${u.user.discriminator} - Level ${u.level}`, 50, 175 + number);
            
            ctx.textAlign = 'left';
            ctx.fillRect(85, 195 + number, 325, 30);

            ctx.beginPath();
            ctx.arc(85, 210 + number, 15, 0.5 * Math.PI, 1.5 * Math.PI, false);
            ctx.fill();
            ctx.arc(85 + 325, 210 + number, 15, 0.5 * Math.PI, 1.5 * Math.PI, true);
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.fillStyle = '#1f1e1e';
            ctx.arc(85, 210 + number, 12, 0.5 * Math.PI, 1.5 * Math.PI, false);
            ctx.fill();
            ctx.arc(85 + 325, 210 + number, 12, 0.5 * Math.PI, 1.5 * Math.PI, true);
            ctx.fill();
            ctx.fillRect(85, 198 + number, 325, 24);
            ctx.closePath();

            ctx.beginPath();
            ctx.fillStyle = '#dd2e44';
            ctx.arc(85, 210 + number, 12, 0.5 * Math.PI, 1.5 * Math.PI, false);
            ctx.fill();
            ctx.fillRect(85, 198 + number, ((u.xp / this.bot.xp.neededXp(u.level)) * 325), 24);
            ctx.arc(85 + ((u.xp / this.bot.xp.neededXp(u.level)) * 325), 210 + number, 12, .5 * Math.PI, 1.5 * Math.PI, true);
            ctx.fill();
            ctx.closePath();
            
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.font = '20px Medium';
            ctx.fillText(`${(u.xp / 1000).toFixed(1)}k / ${(this.bot.xp.neededXp(u.level) / 1000).toFixed(1)}k`, 85 + 162.5, 217.5 + number);
            
            ctx.textAlign = 'left';
            
            number += 95;
        }
        
        // -----------------------------------------------------------
        const buffer = canvas.toBuffer();
        
        message.channel.createMessage('', { file: buffer, name: 'level.png' });
    }

//         const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);

//         if (rawLeaderboard.length < 1) return message.reply("No one is in the leaderboard yet!");

//         const leaderboard = await Levels.computeLeaderboard(bot, rawLeaderboard, true);

//         const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.

//         let lbembed = new Discord.MessageEmbed()
//         .setAuthor("IStay's Utilities", bot.user.avatarURL())
//         .setColor("RANDOM")
//         .setTitle("Leaderboard")
//         .setDescription(lb)

//         message.channel.send(lbembed)

//  //       message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
// }

}