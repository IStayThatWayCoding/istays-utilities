const { Discord, Collection, Client, MessageEmbed } = require("discord.js");
const bot = new Client();
const mongoose = require('mongoose');
const Levels = require('discord-xp');
const fs = require('fs');
const { DisTube } = require ('distube');
const colors = require('./colors.json');

let musicEmbed = new MessageEmbed()
.setAuthor("IStay's Utilities", bot.user.avatarURL())
.setColor(colors.MUSIC)
.setDescription(`Now Playing: \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)

bot.distube = new DisTube(bot, {
    searchSongs: 5,
    searchCooldown: 30,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: false,
});
bot.distube
    .on("playSong", (message, queue, song) => message.channel.send(musicEmbed))


Levels.setURL('mongodb+srv://IStay:JusSmi68@istayutil.zppsi1m.mongodb.net/Data');
bot.categories = fs.readdirSync("./commands/");
bot.commands = new Collection();
bot.aliases = new Collection();
bot.mongoose = require("./utils/mongoose");

['command'].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        bot.on(evtName, evt.bind(null, bot));
        console.log(`Loaded event '${evtName}'`);
        
    });
});

bot.mongoose.init();
bot.login(process.env.TOKEN);