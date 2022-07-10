const { replaceStringTransformer } = require("common-tags");
const Discord = require("discord.js");

const answers = [
	'Maybe.',
	'Certainly not.',
	'I hope so.',
	'Not in your wildest dreams.',
	'There is a good chance.',
	'Quite likely.',
	'I think so.',
	'I hope not.',
	'I hope so.',
	'Never!',
	'Fuhgeddaboudit.',
	'Ahaha! Really?!?',
	'Pfft.',
	'Sorry, bucko.',
	'Hell, yes.',
	'Hell to the no.',
	'The future is bleak.',
	'The future is uncertain.',
	'I would rather not say.',
	'Who cares?',
	'Possibly.',
	'Never, ever, ever.',
	'There is a small chance.',
	'Yes!'
];



module.exports = {
    name: '8ball',
    aliases: ['8'],
    category: 'Fun',
    description: 'Gives a random answer to a question.',
    usage: `8ball <question>`,
    run: async (bot, message, args) => {

        // if(!args[2]) return message.channel.send("Please ask a **FULL** question.");


		

        // let result = Math.floor((Math.random() * answers.length));
        let question = args.slice(1).join(" ");

			fetch(`https://api-monkedev.herokuapp.com/fun/8ball`)
			.then(answer => answer.json())
			.then(data => {
				message.channel.send(data.answer)
			})
			.catch(() => {
				let error = new Discord.MessageEmbed()
				.setTitle("Error!")
				.setColor("#e80909")
				.setDescription("AI Error: Couldn't Fetch Response! Please try a different input.")
	
				message.channel.send(error)
			}) 
		

        const embed = new Discord.MessageEmbed()
        .setTitle(question)
        .setColor("#00008b")
        .setDescription(`${answers[result]}`)
        .setFooter(`8 ball! | Question by ${message.author.tag}`)

        message.channel.send(":game_die: - **Rolling...**")
        .then(msg => {
            msg.delete({ timeout: 100})
        })
        .catch()
        setTimeout(function(){
            message.channel.send(embed);
        }, 200);
}}