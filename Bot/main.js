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
        fs.readdirSync('/home/darii-chan/SourceCode/Discord Applications/Node Applications/NeoSky/Bot #1/Commands')
        .filter(file => file.endsWith('.js'));

      for (let f of Commands) {
        let cmd = require('/home/darii-chan/SourceCode/Discord Applications/Node Applications/NeoSky/Bot #1/Commands/' +
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
  }
  bot_status(text) {
    client.user.setActivity(text)
  }
}
module.exports = Main;
