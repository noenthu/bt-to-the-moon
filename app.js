const Discord = require('discord.js');
const client = new Discord.Client();
//const settings = require('./settings.json');
const token = process.env.DISCORD_TOKEN;

client.on('ready', () => {
  console.log("I'm Online!!!");
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.channel.sendMessage('pong');
  }
});

client.login(token);
