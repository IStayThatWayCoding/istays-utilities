module.exports = {
    name: 'loop',
    aliases: ['repeat'],
    category: 'Music',
    description: 'Toggles loop on music',
    usage: `loop`,
    run: async (bot, message, args) => {

        if(!message.member.voice.channel) return;

        if (!message.member.roles.cache.has('934227687306833950')) return message.channel.send("You must have the DJ role to use this command.")
        const mode = bot.distube.setRepeatMode(message)
        message.channel.send(
            `Set repeat mode to \`${
                mode
                    ? mode === 2
                        ? 'All Queue'
                        : 'This Song'
                    : 'Off'
            }\``,
        )


    }
}