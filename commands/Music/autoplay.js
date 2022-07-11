module.exports = {
    name: 'autoplay',
    aliases: ['ap'],
    category: 'Music',
    description: 'Toggles autoplay on music',
    usage: `autoplay`,
    run: async (bot, message, args) => {

        

        if(!message.member.voice.channel) return;

        if (!message.member.roles.cache.has('934227687306833950')) return message.channel.send("You must have the <@&934227687306833950> role to use this command.")

        const mode = bot.distube.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");


    }
}