const Discord = require("discord.js");
const Guild = require("../models/guild");
const moment = require("moment");

module.exports = async (bot, member, guild, args) => {
    const user = member.user;


    const guildDB = await Guild.findOne({
        guildID: member.guild.id
    }, async (err, guild) => {
        if (err) console.error(err);
        
        if (!guild) {
            const newGuild = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: member.guild.id,
                guildName: member.guild.name,
                prefix: process.env.PREFIX,
                welcomeLogs: null,
                logChannelID: null,
            });

            await newGuild.save()
            .then(result => console.log(result))
            .catch(err => console.error(err));
        };
    });

    const logChannel = member.guild.channels.cache.get(guildDB.logChannelID);

    let WelcomeLogEmbed = new Discord.MessageEmbed()
    .setTitle(member.guild.name)
    .setDescription(`Latest information about the member that joined!`)
    .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
    .addFields(
        {name: 'User Tag', value: `${member}`, inline: true},
        {name: 'Discriminator', value: `${member.user.discriminator}`, inline: true},
        {name: 'Bot', value: `${member.user.bot}`},
        {name: 'Presence', value: `${member.user.presence.status}`, inline: true},
        {name: 'Joined Server At', value: `${moment(member.joinedAt).format('MM/DD/YYYY')}`, inline: true},
        {name: 'Joined Discord At', value: `${moment(member.user.createdAt).format('MM/DD/YYYY')}`, inline: true},
    )
    .setFooter(`${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL({dynamic: true, size: 512}))
    .setColor('RANDOM')
    .setTimestamp()

    logChannel.send(WelcomeLogEmbed);

    let channel = member.guild.channels.cache.get("988686851571343380");

    let embed123 = new Discord.MessageEmbed()
    .setTitle("New Member!")
    .setColor("#7A5EAC")
    .setDescription(`Welcome to **IStay's Resort**, ${user}!\n\nHere are some things to do in order to get started!\n\n- Be sure to read the <#988686829823856650> to stay out of trouble!\n - Get some <#988686824182538270> to personalize YOUR profile\n - Make yourself comfortable!\n\nOnce again, welcome to the server! <@&932816049093607526>, be sure to welcome them!`)

    channel.send(embed123);
    channel.send("<@&932816049093607526>")
    .then(msg => {
        msg.delete({ timeout: 1000})
    })
    .catch()
    user.send("Welcome to **IStay's Resort!** Be sure to read the rules and enjoy your stay :)")




}
