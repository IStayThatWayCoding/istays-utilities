const Discord = require('discord.js');
const got = require('got');

const subreddits = [
	'memes',
	'DeepFriedMemes',
	'bonehurtingjuice',
	'surrealmemes',
	'dankmemes',
	'meirl',
	'me_irl',
	'funny'
];

module.exports = {
    name: 'meme',
    aliases: ['m'],
    category: 'Fun',
    description: 'Gives a random meme from a subreddit',
    usage: `meme`,
    run: async (bot, message, args) => {
        const embed = new Discord.MessageEmbed();
        got('https://www.reddit.com/r/memes/random/.json')
            .then(response => {
                const [list] = JSON.parse(response.body);
                const [post] = list.data.children;
    
                const permalink = post.data.permalink;
                const memeUrl = `https://reddit.com${permalink}`;
                const memeImage = post.data.url;
                const memeTitle = post.data.title;
                const memeUpvotes = post.data.ups;
                const memeNumComments = post.data.num_comments;
    
                embed.setTitle(`${memeTitle}`);
                embed.setColor('RANDOM');
                embed.setImage(memeImage);
                embed.setFooter(`⬆ ${memeUpvotes} 💬 ${memeNumComments}`);
    
                message.channel.send(":rofl: - **Queuing up some laugh tracks...**")
                .then(msg => {
                    msg.delete({ timeout: 100})
                })
                .catch()
                setTimeout(function(){
                    message.channel.send(embed);
                }, 200);
            })
            .catch(console.error);
    }

}