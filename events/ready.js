module.exports = bot => {
    console.log(`${bot.user.username} is online`);
    
    bot.user.setActivity("uhhhh.", {
      type: "LISTENING"
//       url: "https://www.twitch.tv/istaythatway"
    });
}