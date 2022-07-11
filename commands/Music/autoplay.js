module.exports = {
    name: 'autoplay',
    aliases: ['ap'],
    category: 'Music',
    description: 'Toggles autoplay on music',
    usage: `autoplay`,
    run: async (bot, message, args) => {
        const mode = bot.distube.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");


    }
}