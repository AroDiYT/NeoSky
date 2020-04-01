
  fs = require('fs');

class Command_Client {
  get_files(location) {
    const files = fs.readdirSync(location).filter(f => f.endsWith('.js'));
    return files;
  }

  find_cmd(searchterm, files) {
    for(const command of files) {
      let cmd = require(__dirname.slice(0,-4) + "/Commands/" + command)
      if(cmd.name.toLowerCase() == searchterm || cmd.aliases.includes(searchterm)) {
        return cmd;
      }
    }
  }

  execute_cmd(cmd, m, args) {
    try {
      cmd.exec(m, args)
    } catch (err) {
      return console.error(err);
    }
  }

  search_command_usage() {
    C.on('message', async m => {
      const prefix = '&' /* TODO: use config */

      if (!m.content.startsWith(prefix)) return;
      if (m.author.id == C.user.id) return;

      const args = m.content.slice(prefix.length).split(/ +/)
      const searchterm = args.shift().toLowerCase();

      if(searchterm == "help") {
        return CC.help_cmd(m, args);
      } else {

        const files = await CC.get_files(__dirname.slice(0,-4) + "/Commands");
        const cmd = await CC.find_cmd(searchterm, files);

        if(cmd)
        return CC.execute_cmd(cmd, m, args);
      }

    })
    C.on("guildCreate", () => {
      Dsql.generate_tables();
    })
    C.on("guildMemberCreate", () => {
      Dsql.generate_tables();
    })
  }

  async help_cmd(m, args) {
    let girl = CC.get_files(__dirname.slice(0, -4) + "/Commands");
    for(const dick of girl) {
        let fucktape = require(__dirname.slice(0,-4) + "/Commands/" + dick);
        if(!(args.length < 1)) {
        if (fucktape.name.toLowerCase() == args[0].toLowerCase()) {
          if(fucktape.subs && args.length > 1 && fucktape.subs.includes(args[1].toLowerCase())) {
            let count = 0;
            fucktape.subs.forEach(sub => {
              if(sub == args[1].toLowerCase()) {
                count += 1
                let emmy = EM.new_embed();
                EM.set(emmy, "title", fucktape.name + " → " + sub);
                EM.set(emmy, "desc", fucktape.subsinfo[count - 1]);
                EM.set(emmy, "color", "DARK_GREEN");
                return m.channel.send(emmy)
              } else {
                count += 1
              }
            })
          } else {
            let emmy = EM.new_embed()
            EM.set(emmy, "title", "The Manual");
            EM.set(emmy, "desc", `**\`[${fucktape.name}]\`**\n${fucktape.desc}\n\n\`Aliases:\`\n${fucktape.aliases.join(', ') || "none"}`);
            //AQUA, GREEN, BLUE, PURPLE, GOLD, ORANGE, RED, GREY, DARKER_GREY, NAVY,
            //DARK_AQUA, DARK_GREEN, DARK_BLUE, DARK_PURPLE, DARK_GOLD, DARK_ORANGE,
            //DARK_RED, DARK_GREY, LIGHT_GREY, DARK_NAVY, LUMINOUS_VIVID_PINK, DARK_VIVID_PINK
            EM.set(emmy, "color", "LUMINOUS_VIVID_PINK"); // *oh oh oh*
            if(fucktape.subs) {
              EM.add(emmy, "subcommands", fucktape.subs.join(', '));
            }
            return m.channel.send(emmy);
          }
        } else if(fucktape.aliases && fucktape.aliases.includes(args[0].toLowerCase())) {
              if(fucktape.subs && args.length > 1 && fucktape.subs.includes(args[1].toLowerCase())) {
                let count = 0;
                fucktape.subs.forEach(sub => {
                  if(sub == args[1].toLowerCase()) {
                    count += 1
                    let emmy = EM.new_embed();
                    EM.set(emmy, "title", fucktape.name + " → " + sub);
                    EM.set(emmy, "desc", fucktape.subsinfo[count - 1]);
                    EM.set(emmy, "color", "DARK_GREEN");
                    return m.channel.send(emmy)
                  } else {
                    count += 1
                  }
                })


          } else {
            let emmy = EM.new_embed()
            EM.set(emmy, "title", "The Manual");
            EM.set(emmy, "desc", `**\`[${fucktape.name}]\`**\n${fucktape.desc}\n\n\`Aliases:\`\n${fucktape.aliases.join(', ') || "none"}`);
            //AQUA, GREEN, BLUE, PURPLE, GOLD, ORANGE, RED, GREY, DARKER_GREY, NAVY,
            //DARK_AQUA, DARK_GREEN, DARK_BLUE, DARK_PURPLE, DARK_GOLD, DARK_ORANGE,
            //DARK_RED, DARK_GREY, LIGHT_GREY, DARK_NAVY, LUMINOUS_VIVID_PINK, DARK_VIVID_PINK
            EM.set(emmy, "color", "LUMINOUS_VIVID_PINK"); // *oh oh oh*
            if(fucktape.subs) {
              EM.add(emmy, "subcommands", fucktape.subs.join(', '));
            }
            return m.channel.send(emmy);
          }

      } else if (fucktape.cat.toLowerCase() == args[0].toLowerCase()) {
        let category = require(__dirname + '/cats.json');
        let desc = category[args.join(' ').toLowerCase()]
        let all_cmds = [];
        for(const cmd_file of girl) {
          let command = require(__dirname.slice(0,-4) + "/Commands/" + cmd_file);
          if(command.cat.toLowerCase() == args.join().toLowerCase()) {
            all_cmds.push(command.name);
          }

        }
        let emmy = EM.new_embed();
        EM.set(emmy, "title", args.join(' ').toUpperCase());
        EM.set(emmy, "desc", desc);
        EM.set(emmy, "color", "DARK_NAVY");
        EM.add(emmy, "Commands",all_cmds.join(', '))
        return m.channel.send(emmy);
      }
      } else {
        let list_name = [];
        for(const cmd_file of girl) {
          let command = require(__dirname.slice(0,-4) + "/Commands/" + cmd_file);
          if(list_name.includes(command.cat)){
          }else{
            list_name.push(command.cat)
          }

        }
        let emmy = await EM.new_embed();
        EM.set(emmy, "title", "The Manual");
        EM.set(emmy, "desc", "Use &help (command_name or category_name) to view more information.");
        EM.add(emmy, "Categories",list_name.join('\n'))
        return m.channel.send(emmy);
      }
    }
  }
}
module.exports = Command_Client;
