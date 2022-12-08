const Discord = require('discord.js');
const Levels = require('discord-xp');
const fetch = require('node-fetch').default;
const rankXP = require('../modules/rank_xp');
const config = require('../config.json')

// let previousCounter = [];
// let count = 0;

// let timeout



module.exports = async (bot, message) => {

    // const countingChannel = message.guild.channels.cache.get("991954203478081617");

    if (message.author.bot) return;

    let prefix = config.prefix;

    if (!message.guild) return;

    if (message.channel.id === "996676151172943906") {

        fetch(`https://api-monkedev.herokuapp.com/fun/chat?msg=${message.content}&uid=${message.author.id}`)
            .then(response => response.json())
            .then(data => {
                message.channel.send(data.response)
            })
            .catch(() => {
                let error = new Discord.MessageEmbed()
                    .setTitle("Error!")
                    .setColor("#e80909")
                    .setDescription("AI Error: Couldn't Fetch Response! Please try a different input.")

                message.channel.send(error)
                return;
            })


    }

    rankXP(message, bot);


    if (!message.content.startsWith(prefix)) return;


    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    if (command)
        command.run(bot, message, args);

};