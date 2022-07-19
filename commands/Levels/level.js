const {
    MessageAttachment
} = require('discord.js');
const mongo = require('../../utils/mongoose');
const rankSchema = require('../../models/rank_schem');
const Canvas = require('canvas');
const path = require('path');

function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + "K" : Math.sign(num) * Math.abs(num);
}

module.exports = {
    name: 'level',
    aliases: ['rank', 'xp'],
    category: 'Levels',
    description: 'Provides user level',
    usage: `level/rank/xp`,
    run: async (bot, message, args) => {
        const target = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;

        const background = await Canvas.loadImage('./rankbg.jpg');
        const rankFirst = await Canvas.loadImage('./firstplace.png');
        const rankSecond = await Canvas.loadImage('./secondplace.png');
        const rankThird = await Canvas.loadImage('./thirdplace.png');

        await mongo().then(async mongoose => {
            try {
                const results = await rankSchema.find({
                    id: target.id
                }).catch(err => console.error(`${path.basename(__filename)} There was a problem finding a database entry: `, err));

                if (results.length === 0) {
                    return message.channel.send(`This user isn't ranked yet! (send messages)`)
                        .catch(err => console.error(`${path.basename(__filename)} There was a problem sending an interaction: `, err));
                }

                for (const info of results) {
                    let {
                        username,
                        discrim,
                        rank,
                        level,
                        msgCount,
                        xxp,
                        xxxp
                    } = info;

                    const rankPos = parseInt(rank);
                    const canvas = Canvas.createCanvas(930, 280);
                    const ctx = canvas.getContext("2d");

                    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                    ctx.fillRect(20, 30, canvas.width - 40, canvas.height - 60);

                    let userDiscrim = username + "#" + discrim;
                    if (userDiscrim.length > 30) {
                        ctx.font = "30px grotesk";
                        userDiscrim = userDiscrim.slice(0, 25) + "...";
                    } else if (userDiscrim.legnth > 20) {
                        ctx.font = "30px grotesk";

                    } else {
                        ctx.font = "37px grotesk";
                    }
                    ctx.fillStyle("#ffffff");
                    ctx.fillText(userDiscrim, canvas.width / 3.8, canvas.height / 2.8);

                    ctx.font = "35px grotesk";
                    ctx.fillStyle = "#44eaff";
                    ctx.fillText(`Rank ${level}`, camvas.width / 3.8, canvas.height / 1.6);

                    let xp2 = kFormatter(xxxp);
                    let xp3 = kFormatter(xxp);
                    let count = kFormatter(msgCount);

                    ctx.font = "23px grotesk";
                    ctx.fillStyle = "#ffffff";
                    ctx.textAlign = "right";
                    ctx.fillText(`Message Count" ${count}`, canvas.width / 1.16, canvas.height / 1.6);

                    const percentage = Math.floor((xxp / xxxp) * 100);
                    const roundedPercent = Math.round(percentage);

                    const testPerc = 100;
                    for (let i = 0; i < testPerc; i++) {
                        ctx.beginPath();
                        ctx.lineWidth = 14;
                        ctx.strokeStyle = "#48484E";
                        ctx.fillStyle = "#48484E";
                        ctx.arc(260 + (i * 5.32), 205, 8, 0, Math.PI * 2, true);
                        ctx.stroke();
                        ctx.fill();
                    }

                    for (let i = 0; i < roundedPercent; i++) {
                        ctx.beginPath();
                        ctx.lineWidth = 14;
                        ctx.strokeStyle = "#44eaff";
                        ctx.fillStyle = "#44eaff";
                        ctx.arc(260 + (i * 5.32), 205, 5.5, 0, Math.PI * 2, true);
                        ctx.stroke();
                        ctx.fill();
                    }

                    ctx.font = "24px grotesk";
                    ctx.fillStyle = "#000000";
                    ctx.fillText(`${xp3} / ${xp2} XP`, canvas.width / 1.525, canvas.height / 1.31);

                    if (rankPos.length >= 5) {
                        ctx.font = "45px grotesk";
                    } else if (rankPos.length >= 3) {
                        ctx.font = "50px grotesk";
                    } else {
                        ctx.font = "60px grotesk";
                    }

                    if (rankPos === 1) {
                        ctx.drawImage(rankFirst, 820, 50, 70, 70);
                    } else if (rankPos === 2) {
                        ctx.drawImage(rankSecond, 820, 50, 70, 70);
                    } else if (rankPos === 3) {
                        ctx.drawImage(rankThird, 820, 50, 70, 70);
                    } else {
                        ctx.font = "55px grotesk";
                        ctx.fillStyle = "#44eaff";
                        ctx.textAlign = "right";
                        ctx.fillText(`#${rankPos}`, canvas.width / 1.05, canvas.height / 2.8);
                    }

                    ctx.beginPath();
                    ctx.arc(140, 140, 80, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.clip();

                    const avatarURL = target.user.displayAvatarURL({format: "png"}) + "?size=64";
                    const avatar = await Canvas.loadImage(avatarURL);
                    ctx.drawImage(avatar, 60, 60, 160, 160);

                    const attachment = new MessageAttachment(canvas.toBuffer(), "profile-image.png");
                    message.channel.send(attachment);
                }
            } finally {
                // not a thing
            }
        })
    }

}