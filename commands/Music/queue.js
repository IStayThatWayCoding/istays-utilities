module.exports = {
    name: 'queue',
    aliases: ['q'],
    category: 'Music',
    description: 'Shows music queue',
    usage: `queue`,
    run: async (bot, message, args) => {
        const queue = bot.distube.getQueue(message)
        if (!queue) {
            message.channel.send('Nothing playing right now!')
        } else {
            message.channel.send(
                `Current queue:\n${queue.songs
                    .map(
                        (song, id) =>
                            `**${id ? id : 'Playing'}**. ${
                                song.name
                            } - \`${song.formattedDuration}\``,
                    )
                    .slice(0, 10)
                    .join('\n')}`,
            )
        }

    //     if (
    //         [
    //             '3d',
    //             'bassboost',
    //             'echo',
    //             'karaoke',
    //             'nightcore',
    //             'vaporwave',
    //         ].includes(command)
    //     ) {
    //         const filter = distube.setFilter(message, command)
    //         message.channel.send(
    //             `Current queue filter: ${filter.join(', ') || 'Off'}`,
    //         )
    //     }
           
     }
}