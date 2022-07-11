const { VoiceConnectionDisconnectReason } = require("@discordjs/voice");

var voters = []


module.exports = {
    name: 'skip',
    category: 'Music',
    description: 'Skips the music',
    usage: `skip`,
    run: async (bot, message, args) => {

        var required = Math.ceil(message.member.voice.channel.members.size/2);

        const queue = bot.distube.getQueue(message)
        let members = Math.ceil(message.member.voice.channel.members.size/2)


        let channel = message.member.voice.channel;
        if (!channel) {
            return message.channel.send(`\`You are not connected to a voice channel!\``);
        }
        if (!queue) {
            return message.channel.send("Nothing is playing in queue.")
        }

        if (!queue.autoplay && queue.songs.length <= 1){
            message.channel.send("No songs to skip!")
        }

        if (message.member.roles.cache.has('934227687306833950')){
            voters = []
            message.channel.send("Force skipping song...")
            bot.distube.skip(message);
            message.delete();
            return;
        }

        if(voters.find(id=>id == message.author.id)){
            return;
        } else {
            voters.push(message.author.id)
            message.channel.send(`Votes ${voters.length}/${members}. ${members - voters.length} more vote(s) to skip`)
        }

        if (queue.autoplay || queue.songs.length > 1){
            distube.skip(message)
        } else {
            distube.stop(message) 
        }

        if(voters.length === members){
            bot.distube.skip(message)
        }

        // voters.push(message.author.id)

        // if(voters.length != 5) {
        //     message.delete()
        //     message.channel.send(5-voters.length + " more vote(s) needed to skip")
        // } else if(voters.length === 5){
        //     voters = []
        //     message.channel.send("Skipping song")
        //     bot.distube.skip(message);
        // }

        // const allowedRoles = [
        //     "992191733238595644",
        //     "934227687306833950",
        //     "963704992299122719",
        //     "932721572370862110",
        //     "764323362813509673",
        //     "932728784942153798",
        //     "932731510874837052",
        //     "932731168938401843",
        //     "932731763120300032",
        //     "932719637873950810"
        // ]

        // if (!message.member.roles.cache.has('934227687306833950')) return message.channel.send("You do not have the power to skip. :/")





        // bot.distube.skip(message)


    }
}