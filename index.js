const { Discord, Collection, Client} = require("discord.js");
const bot = new Client();
const mongoose = require('mongoose');
const Levels = require('discord-xp');
const fs = require('fs');
const { DisTube } = require ('distube');
const colors = require('./colors.json');
const message = require("./events/message");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");



bot.distube = new DisTube(bot, {
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
    searchSongs: 5,
    searchCooldown: 30,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    leaveOnStop: true,
});




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

const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${
        queue.filters.join(', ') || 'Off'
    }\` | Loop: \`${
        queue.repeatMode
            ? queue.repeatMode === 2
                ? 'All Queue'
                : 'This Song'
            : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

bot.distube
    .on('playSong', (queue, song) =>
        queue.textChannel?.send(
            `Playing \`${song.name}\` - \`${
                song.formattedDuration
            }\`\nRequested by: ${song.user}\n${status(queue)}`,
        ),
    )



    .on('addSong', (queue, song) =>
            
        queue.textChannel?.send(
            `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
 
        ),
    )

    .on('addList', (queue, playlist) =>
        queue.textChannel?.send(
            `Added \`${playlist.name}\` playlist (${
                playlist.songs.length
            } songs) to queue\n${status(queue)}`,
        ),
    )
.on('error', (textChannel, e) => {
    console.error(e)
    textChannel.send(
        `An error encountered: ${e.message.slice(0, 2000)}`,
    )
})

.on('finish', queue => queue.textChannel?.send('Finish queue!'))
    .on('finishSong', queue =>
        queue.textChannel?.send('Finish song!'),
    )
    .on('disconnect', queue =>
        queue.textChannel?.send('Disconnected!'),
    )
    .on('empty', queue =>
        queue.textChannel?.send(
            'The voice channel is empty! Leaving the voice channel...',
        ),
    )
.on('searchResult', (message, result) => {
    let i = 0
    message.channel.send(
        `**Choose an option from below**\n${result
            .map(
                song =>
                    `**${++i}**. ${song.name} - \`${
                        song.formattedDuration
                    }\``,
            )
            .join(
                '\n',
            )}\n*Enter anything else or wait 30 seconds to cancel*`,
    )
})
.on('searchCancel', message =>
    message.channel.send('Searching canceled'),
)
.on('searchInvalidAnswer', message =>
    message.channel.send('Invalid number of result.'),
)
.on('searchNoResult', message =>
    message.channel.send('No result found!'),
)
.on('searchDone', () => {})

bot.mongoose.init();
bot.login(process.env.TOKEN);