const Discord = require("discord.js");
const fs = require("fs");
require("dotenv").config();
const config = require("./config.json");
const prefix = config.prefix;
const bot = new Discord.Client({
  enableMentions: "everyone",
  partials: ["REACTION"],
});
const { Player } = require('discord-player');
const player = new Player(bot);
bot.player = player;
bot.config = require('./config/bot.json');
bot.emotes = require('./config/emojis.json');
bot.filters = require('./config/filters.json');
const mongoose = require("mongoose");
bot.prefix = prefix;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.snipes = new Discord.Collection();
bot.events = new Discord.Collection();
const Playing = require("discord-playing");
Playing(client, {
	live :  "In Game",
	games : ["Minecraft"], 			// Array of Games, can be 1 or multiples format changed on v2.0.0
	//, required : "Streamers" 			// optional parameter, only use if you want to take action on people of a specific role
	//, casesensitive : true, 		 	// optional, default to true
	//, exactmatch : true, 				// optional, default to true, will match if the configured string is present in the activity or state
});

fs.readdir('./events/music/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/music/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading event ${eventName}`);
        bot.on(eventName, event.bind(null, bot));
    });
});
fs.readdir('./player-events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./player-events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading player event ${eventName}`);
        bot.player.on(eventName, event.bind(null, bot));
    });
});
bot.categories = fs.readdirSync("./commands/");
const token = require(`./config.json`);
const message = require("./events/guild/message");
mongoose.connect(token.Mongo, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
["command", "server"].forEach((handler) => {
  require(`./handlers/${handler}`)(bot);
});
bot.on("ready", () => {
  require("./events/client/ready")(bot);
  }).catch(console.error);
});
bot.on("message", async (message) => {
  message.member; //-- GuildMember based
  message.author; //-- User based
  require("./events/guild/message")(bot, message);
});
bot.on("messageUpdate", async (oldMessage, newMessage) => {
  require("./events/guild/messageUpdate")(oldMessage, newMessage);
});
bot.on("messageDelete", async (message) => {
  require("./events/guild/messageDelete")(message);
});
bot.on("messageReactionAdd", (reaction, user) => {
  require("./events/guild/messageReactionAdd")(reaction, user);
});
bot.on("messageReactionRemove", (reaction, user) => {
  require("./events/guild/messageReactionRemove")(reaction, user);
});
bot.login(token.Token);
