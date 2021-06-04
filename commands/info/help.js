const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "The help command, what do you expect?",

    async run (client, message, args){

        //All Commands

        const economy = new Discord.MessageEmbed()
        .setTitle('Economy Commands')
        .setTitle('Default Prefix "!"')
        .addField('Coming Soon!')
        .setTimestamp()
        
//pembatas

        const moderation = new Discord.MessageEmbed()
        .setTitle('Moderation Commands')
        .setTitle('Default Prefix "!"')
        .addField('kick', '(Prefix)kick (Tags Members Or Id)')
        .addField('ban', '(Prefix)ban (Tags Members Or Id)')
        .addField('clear', '(Prefix)clear')
        .addField('say', '(Prefix)say (Message)')
        .setTimestamp()

//pembatas
       
        const fun = new Discord.MessageEmbed()
        .setTitle('Fun Commands')
        .setTitle('Default Prefix "!"')
        .addField('8ball', '(Prefix)8ball (Question)')
        .addField('meme', '(Prefix)meme')
        .addField('poll', '(Prefix)poll (Message)')
        .addField('avatar', '(Prefix)avatar')
        .addField('dm', '(Prefix)dm (Members Tag)')
        .setTimestamp()

//pembatas

        const utility = new Discord.MessageEmbed()
        .setTitle('Utlity Commands')
        .setTitle('Default Prefix "!"')
        .addField('calculate', '(Prefix)calculate (Format)' )
        .addField('ping', '(Prefix)ping')
        .addField('weather', '(Prefix)weather (Location)')
        .addField('oldest', '(Prefix)oldest')
        .setTimestamp()

//pembatas

        const pages = [
                economy,
                moderation,
                fun,
                utility
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
}
