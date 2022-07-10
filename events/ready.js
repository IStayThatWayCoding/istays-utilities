const antiSpam = require('better-discord-antispam-with-good-grammar');

module.exports = bot => {

    antiSpam(bot, {
      limitUntilWarn: 3,
      limitUntilMuted: 5,
      interval: 2000,
      warningMessage: "please stop spamming! You will be punished if you continue.",
      muteMessage: "was sadly muted because they couldn't follow the rules :/",
      maxDuplicatesWarning: 7,
      maxDuplicatesMute: 10,
      ignoredRoles: ["✳ - Filter Exempt"],
      ignoredMembers: ["istay#5154"],
          mutedRole: "Muted",
          timeMuted: 1000 * 600,
          logChannel: "・main-logs"
    });

  

    console.log(`${bot.user.username} is online`);
    
    bot.user.setActivity("with istay", {
      type: "STREAMING",
      url: "https://www.twitch.tv/istaythatway"
    });
}