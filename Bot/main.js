class Main {
  login(token) {
    client.login(token)
    client.once('ready', () => {
      console.log(`
                  [Client] → Logged in as ${client.user.username}
                  `)
                  Dsql.generate_tables();
    })
  }
  command_client() {
    client.on('message', msg => {
      let prefix = '&'
      if (msg.author.id == client.user.id) return;
      if (!msg.content.startsWith(prefix)) return;

      let args = msg.content.slice(prefix.length).split(/ +/);
      let c = args.shift().toLowerCase();

      let Commands =
        fs.readdirSync(__dirname.slice(0,-4) + '/Commands')
        .filter(file => file.endsWith('.js'));

      for (let f of Commands) {
        let cmd = require(__dirname.slice(0,-4) + '/Commands/' +
          f, true);
        if (cmd.name == c) {
          try {
            cmd.execute(msg, args);
          } catch (err) {
            msg.channel.send('due to an error I was unable to execute this command.')
            try {
              let log = new Discord.RichEmbed()
              log.setAuthor(`${msg.author.username}`, msg.author.avatarURL)
              log.setDescription(`Has errored following command:\n**${c}**\n
                \nError: ${err}`);
              msg.guild.channels.find(ch => ch.name == "error-log").send(log)
            } catch (err) {
              console.error(err)
            }
          }
        } else if (cmd.aliases && cmd.aliases.includes(c)) {
          try {
            cmd.execute(msg, args);
          } catch (err) {
            msg.channel.send('due to an error I was unable to execute this command.')
            try {
              let log = new Discord.RichEmbed()
              log.setAuthor(`${msg.author.username}`, msg.author.avatarURL)
              log.setDescription(`Has errored following command:\n**${c}**\n
                \nError: ${err}`);
              msg.guild.channels.find(ch => ch.name == "error-log").send(log)
            } catch (err) {
              console.error(err)
            }
          }
        } else if (!(isNaN(c)) && c < 11 && c > 0) {
          msg.reply('WIP')
          return;
        }
      }
    })
    client.on("guildCreate", ()=> {
      Dsql.generate_tables();
    })
    client.on("guildMemberCreate", ()=> {
      Dsql.generate_tables();
    })
    client.on('message', msg => {
     if(msg.author.id == client.user.id) return;
     if(msg.author.bot) return;
     if(msg.guild == null && !msg.content.startsWith('&')) {
       let embed = new Discord.RichEmbed();
       embed.setDescription(`↓__\`Direct Message\`__ → **\`${msg.author.username}\`**↓\n → ${msg.content} ←`);
       client.guilds.get('693813732102504508').channels.get('694628234830151700').send(embed)
     } else if(!msg.content.startsWith('&')) {
       try {
         let embed = new Discord.RichEmbed();
         embed.setDescription(`
         ↓__**\`${msg.guild.name} - ${msg.channel.name}\`**__ → **\`${msg.author.username}\`**↓\n → ${msg.content} ←
         `);
         client.guilds.get('693813732102504508').channels.get('694628234830151700').send(embed);
       } catch (err) {
         console.log(`↓__**\`${msg.guild.name} - ${msg.channel.name}\`**__ → **\`${msg.author.username}\`**↓\n → ${msg.content} ←`)
       }
     }
   })
   client.on('messageUpdate', (msg1,msg2) => {
     if(msg2.author.id == client.user.id) return;
     if(msg2.author.bot) return;
     if(msg2.guild == null && !msg2.content.startsWith('&')) {
       let embed = new Discord.RichEmbed();
       embed.setDescription(`↓__\`Direct Message\`__ → **\`${msg2.author.username}\`**↓\n → ${msg1.content} ←\n\`Edited to\`\n→ ${msg2.content} ←`);
       client.guilds.get('693813732102504508').channels.get('694628234830151700').send(embed)
     } else if(!msg2.content.startsWith('&')) {
       try {
         let embed = new Discord.RichEmbed();
         embed.setDescription(`
         ↓__**\`${msg1.guild.name} - ${msg1.channel.name}\`**__ → **\`${msg1.author.username}\`**↓\n EDIT → ${msg2.content} ←
         `);
         client.guilds.get('693813732102504508').channels.get('694628234830151700').send(embed);
       } catch (err) {
         console.log(`↓__**\`${msg1.guild.name} - ${msg1.channel.name}\`**__ → **\`${msg1.author.username}\`**↓\n → ${msg2.content} ←`)
       }
     }
   })
   client.on("messageDeleteBulk", function(messages){
     let embed = new Discord.RichEmbed();
     embed.setDescription(`
     ↓*Multiple messages have been deleted at once*
     `);
     embed.addField("Messages:",messages)
     client.guilds.get('693813732102504508').channels.get('694628234830151700').send(embed);
   });
   client.on("messageDelete", function(msg){
     if(msg.guild == null && !msg.content.startsWith('&')) {
       let embed = new Discord.RichEmbed();
       embed.setDescription(`↓__\`Direct Message\`__ → **\`${msg.author.username}\`**↓\n → ${msg.content} ←`);
       client.guilds.get('693813732102504508').channels.get('694628234830151700').send(embed)
     } else if(!msg.content.startsWith('&')) {
       let embed = new Discord.RichEmbed();
       embed.setDescription(`
       ↓__\`${msg.guild.name} - ${msg.channel.name}\`__ → **\`${msg.author.username}\`**↓\n***Message Deleted***\n\n → ${msg.content} ←
       `);
       client.guilds.get('693813732102504508').channels.get('694628234830151700').send(embed);
     }
   });

   client.on("channelDelete", function(channel){
       console.log(`channelDelete: ${channel}`);
   });

   client.on("channelCreate", function(channel){
       console.log(`channelCreate: ${channel}`);
   });
  }
  bot_status(text) {
    client.user.setActivity(text)
  }
}
module.exports = Main;
