module.exports = {
    name: 'loop',
    aliases: ['repeat'],
    category: 'Music',
    description: 'Toggles loop on music',
    usage: `loop`,
    run: async (bot, message, args) => {
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