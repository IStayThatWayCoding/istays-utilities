const rankSort = require('../modules/rank_sort');
const Canvas = require('canvas');
const cronjob = require('cron').CronJob;


module.exports = bot => {
  
    Canvas.registerFont('../fonts/Minecraft.ttf', { family: "normal"})

    console.log(`${bot.user.username} is online`);
    
    bot.user.setActivity("with istay", {
      type: "STREAMING",
      url: "https://www.twitch.tv/istaythatway"
    });

    rankSort(bot);
}