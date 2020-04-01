
Discord = require('discord.js');
D = Discord;
Config = require('./config.json');

F = require('./Bot/functions.js')
FS = new F();
EM = new F();
client = new Discord.Client();
C = client;
fs = require('fs');

const nekoslife = require('nekos.life');
neko = new nekoslife();

const Bot = require('./Bot/main.js');
CC = new Bot();

new Bot().search_command_usage()
client.login(Config.bot_token)

let sqlite3 = require('sqlite3').verbose()
db = new sqlite3.Database('./Database/Players.db', (err) => {
if (err) {
  return console.error(err.message);
}
console.log(`
        Database loaded, configuring tables now.
            `);
});

let DB = require('./Database/main.js')
let PF = require('./Bot/profile.js')
let IT = require('./Bot/item.js');
Item = new IT();
Pfsql = new PF();
Dsql = new DB();
