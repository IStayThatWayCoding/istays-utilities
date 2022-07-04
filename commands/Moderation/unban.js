const Discord = require('discord.js');
const Guild = require('../../models/guild');
const colors = require('../../colors.json');

module.exports = {
    name: 'unban',
    aliases: ['ub'],
    category: 'Moderation',
    description: 'Unbans a user by ID',
    usage: `unban <user (id)> [reason]`,
    run: async (bot, message, args) => {

        message.delete();

        const guildDB = await Guild.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
        })

        


        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.channel.send('You are lacking the permission `BAN_MEMBERS`').then(m => m.delete({timeout: 5000}));

        let reason = args.slice(1).join(' ');
        if(!reason){
            reason = "No reason specified"
        }

        let reasonDiscord = `${message.author.tag} - ${reason}`;

        

        let userID = args[0];

        if (!args[0]) return message.channel.send('User not specified. Please put a valid user ID, followed by the command.').then(m => m.delete({timeout: 5000}));
        if (isNaN(args[0])) return message.channel.send("ID isn't a number!")



        

        message.guild.fetchBans().then(async bans => {



            if (bans.size == 0) return message.channel.send("No bans are recorded on this server.")
            let bUser = bans.find(b => b.user.id == userID);
            if (!bUser) return message.channel.send("User not banned.");
            await message.guild.members.unban(bUser.user, reasonDiscord).catch(err => {
                console.log(err);
                return message.channel.send("Something went wrong.");
            }).then(() => {

                // const embed = new Discord.MessageEmbed()
                // .setColor(colors.red_dark)
                // .setTitle('Unbanned')
                // .addField('User ID', `${args[0]}`)
                // .addField('Unbanned by:', `${(message.author)}`)
                // .addField('Reason', reason);

                message.channel.send(`Unbanned **${args[0]}**!`)
                
                
            })
            })
        
           
        }
}