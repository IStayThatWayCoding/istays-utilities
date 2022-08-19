const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'slowmode',
    aliases: ['sm'],
    category: 'Moderation',
    description: 'Sets the slowmode of a channel to a specific input',
    usage: `slowmode <time> [reason]`,
    run: async (bot, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.channel.send('You are lacking the permission `MANAGE_MESSAGES`').then(m => m.delete({
                timeout: 5000
            }));

        if(!args[0]) return message.channel.send(`Invalid Number`);

        const currentSlowmode = message.channel.rateLimitPerUser
        const reason = args[1] ? args.slice(1).join(" ") : "Not Specified"

        if(args[0] === "off") {
            if(currentSlowmode === 0) {
                return message.channel.send(`\`Slowmode\` is already off!`)
            }
            message.channel.setRateLimitPerUser(0, reason)
            return message.channel.send(`\`Slowmode\` is now off!`)
        }

        const time = ms(args[0]) / 1000
        if (isNaN(time)) {
            return message.channel.send('Invalid time. Please specify the time in units mentioned. \n\nTime Units - h(hour), m(minute), s(seconds)')
        }

        if(time > 21600000) {
            return message.channel.send(`Time is too high! Go below six hours!`)
        }

        if(currentSlowmode === time) {
            return message.channel.send(`\`Slowmode\` is already set to ${args[0]}!`)
        }

        let slowmode = await message.channel.setRateLimitPerUser(time, reason)
        let afterSlowmode = message.channel.rateLimitPerUser
        if(afterSlowmode > 0) {
            message.channel.send(`\`Slowmode\` Enabled\n\nDuration: ${args[0]}\n\nReason: ${reason}`)
        } else if (afterSlowmode === 0) {
            return message.channel.send('Invalid time. Please specify the time in units mentioned. \n\nTime Units - h(hour), m(minute), s(seconds)')
        }
        

    }
}