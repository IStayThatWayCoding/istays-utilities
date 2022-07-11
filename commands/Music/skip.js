
module.exports = {
    name: 'skip',
    category: 'Music',
    description: 'Skips the music',
    usage: `skip`,
    run: async (bot, message, args) => {

        const allowedRoles = [
            "992191733238595644",
            "934227687306833950",
            "963704992299122719",
            "932721572370862110",
            "764323362813509673",
            "932728784942153798",
            "932731510874837052",
            "932731168938401843",
            "932731763120300032",
            "932719637873950810"
        ]

        if (!allowedRoles.includes(message.author.id)) return message.channel.send("You do not have the power to skip. :/")

        const queue = bot.distube.getQueue(message)


        let channel = message.member.voice.channel;
        if (!channel) {
            return message.channel.send(`\`You are not connected to a voice channel!\``);
        }
        if (!queue) {
            return message.channel.send("Nothing is playing in queue.")
        }
        if (queue.songs.length < 1) {
            return;
        }



        bot.distube.skip(message)


    }
}