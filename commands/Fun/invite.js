module.exports = {
    name: 'invite',
    aliases: ['inv'],
    category: 'Fun',
    description: 'Gives an invite link to the server',
    usage: `invite`,
    run: async (bot, message, args, guild) => {
        message.channel.send(`:busts_in_silhouette: Invite friends to the server with this link! - https://discord.gg/sxWPhySBsN`)
           
    }
}