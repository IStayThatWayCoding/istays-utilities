const { Discord, Collection, Client } = require("discord.js");
const bot = new Client();
const mongoose = require('mongoose');
const Levels = require('discord-xp');
const fs = require('fs');
const DisTube = require('distube');

bot.distube = new DisTube(bot, { searchSongs: false, emitNewSongOnly: true});


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