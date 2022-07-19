const rankSort = require('../modules/rank_sort');
const Canvas = require('canvas');
const cronjob = require('cron').CronJob;

module.exports = bot => {
  
    Canvas.registerFont('../res/fonts/ulm_grotesk.ttf', { family: "grotesk"})

    console.log(`${bot.user.username} is online`);
    
    bot.user.setActivity("with istay", {
      type: "STREAMING",
      url: "https://www.twitch.tv/istaythatway"
    });

    rankSort(bot);
}