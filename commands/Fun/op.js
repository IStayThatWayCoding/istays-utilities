module.exports = {
    name: 'op',
    category: 'Fun',
    description: 'lol',
    usage: `op <@user>`,
    run: async (bot, message, args) => {
        if (!message.member.roles.cache.has('992191733238595644')) return message.channel.send("You must have the <@&992191733238595644> role to use this command.")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        message.channel.send(`*[IStay's Utilities: Made <@${member.id}> a server operator.]*`)
           
    }
}