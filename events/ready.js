const rankSort = require('../modules/rank_sort');
const Canvas = require('canvas');
const cronjob = require('cron').CronJob;
const mongo = require('../utils/mongoose');
const path = require('path')

module.exports = bot => {
  
    Canvas.registerFont('./ulm_grotesk.ttf', { family: "grotesk"})

    console.log(`${bot.user.username} is online`);

    await mongo().then(mongoose => {
      try {
        console.log('Connected to database')
      } catch (err) {
        console.error
      }

      console.error(`${path.basename(__filename)} There was a problem connecting to the database: `, err);
    })
    

    bot.user.setActivity("with istay", {
      type: "STREAMING",
      url: "https://www.twitch.tv/istaythatway"
    });

    rankSort(bot);
}