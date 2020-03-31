class PF {
  async setup_new(mem, g, msg) {
    const ch = await msg.channel.guild.createChannel(mem.tag, {
                   type: 'text',
                   permissionOverwrites: [
                       {
                           id: msg.guild.defaultRole,
                           deny: ['READ_MESSAGES']
                       },
                       {
                           id: mem.id,
                           allow: ['READ_MESSAGES', 'SEND_MESSAGES']
                       },
                       {
                           id: '688492645877940333', /* @manager */
                           allow: ['READ_MESSAGES', 'SEND_MESSAGES', 'MANAGE_MESSAGES']
                       }
                   ]
               })
               if (!ch)
                   return msg.channel.send('error while entering setup: couldnt create channel')
               ch.send(`<@!${mem.id}> entered setup mode`);


   let embed = new Discord.RichEmbed();
   embed.setAuthor(`What is your characters name?`);
   let data = []
   let msgname = await ch.send(embed)
   await ch.awaitMessages(response => msg.content, { max: 1,
     time: 180000, errors: ['time'] })
   .then((collected) => {
     if(collected.first().attachments.size > 0){
       data.push("Error found while parsing var, rerun &ch setup and pass valid argruments.");
       collected.first().delete();
     } else {
       data.push(collected.first().content.replace(/'/g, '"'));
       collected.first().delete();
     }
       })
       .catch(function(){
       ch.send('You didnt write your name in given time');
       ch.delete(10000)
     })


   embed.setAuthor('What is your characters age?')
   embed.setDescription(`Name: ${data[0]}`);
   await msgname.edit(embed)
   await ch.awaitMessages(response => msg.content, {max: 1, time: 180000, errors: ['time']})
   .then((collected) => {
     if(collected.first().attachments.size > 0){
       data.push("Error found while parsing var, rerun &ch setup and pass valid argruments.");
       collected.first().delete();
     } else {
       data.push(collected.first().content.replace(/'/g, '"'));
       collected.first().delete();
     }
   })
   .catch(function(){
     ch.send("You didn't write your age in given time.")
     ch.delete(10000)
   })


   embed.setAuthor('What is your characters gender?')
   embed.setDescription(`Name: ${data[0]} → Age: ${data[1]}`)
   await msgname.edit(embed)
   await ch.awaitMessages(response => msg.content, {max: 1, time: 180000, errors: ['time']})
   .then((collected) => {
     if(collected.first().attachments.size > 0){
       data.push("Error found while parsing var, rerun &ch setup and pass valid argruments.");
       collected.first().delete();
     } else {
       data.push(collected.first().content.replace(/'/g, '"'));
       collected.first().delete();
     }
   })
   .catch(function(){
     ch.send("You didn't write your gender in given time.")
     ch.delete(10000)
   })


   embed.setAuthor('What is your characters group?')
   embed.setDescription(`Name: ${data[0]} → Age: ${data[1]} → Gender: ${data[2]}`)
   await msgname.edit(embed)
   await ch.awaitMessages(response => msg.content, {max: 1, time: 180000, errors: ['time']})
   .then((collected) => {
     if(collected.first().attachments.size > 0){
       data.push("Error found while parsing var, rerun &ch setup and pass valid argruments.");
       collected.first().delete();
     } else {
       data.push(collected.first().content.replace(/'/g, '"'));
       collected.first().delete();
     }
   })
   .catch(function(){
     ch.send("You didn't write your group in given time.")
     ch.delete(10000)
   })

     //Name: ${data[0]} → Age: ${data[1]} → Gender: ${data[2]} → Race: ${data[3]}
     let slot;
     db.get(`select slot from [Players Guild(${g.id})] where player_id = '${mem.id}'`, function(err, get) {
       if(get == "undefined" || err) Dsql.generate_tables();
       if(get.slot > 19) {
         db.get(`select * from [Profile Player(${mem.id}) -> Guild(${g.id})] where character_slot = '${get.slot}'`, function(err, test) {
           if(test.ran_setup == "true")
           return msg.channel.send("Max characters reached, you can edit an in-use slot with &ch setup, while being on that slot (&ch to (slot/charname))");
         })
       }
       slot = get.slot;
     })
     setTimeout(complete, 500)
     function complete() {
       let keys = "(character_slot, name, age, gender, race, ran_setup)"
       let values = `('${slot}','${data[0]}','${data[1]}','${data[2]}','${data[3]}','true')`
       let query = ('insert or replace into ' + `[Profile Player(${mem.id}) -> Guild(${g.id})] ` + keys + " values " + values)
       Dsql.Init_Stats(msg.author, msg.guild, slot);
       Dsql.Init_Inventory(msg.author, msg.guild, slot);
       db.run(query)
       ch.delete()
       msg.reply(" now you can check your profile with &character/&ch");
     }
  }
  //-----------------------//
  async setup(mem, g, msg) {
    const ch = await msg.channel.guild.createChannel(mem.tag + "-edit", {
                   type: 'text',
                   permissionOverwrites: [
                       {
                           id: msg.guild.defaultRole,
                           deny: ['READ_MESSAGES']
                       },
                       {
                           id: mem.id,
                           allow: ['READ_MESSAGES', 'SEND_MESSAGES']
                       },
                       {
                           id: '688492645877940333', /* @manager */
                           allow: ['READ_MESSAGES', 'SEND_MESSAGES', 'MANAGE_MESSAGES']
                       }
                   ]
               })
               if (!ch)
                   return msg.channel.send('error while entering setup: couldnt create channel')
               ch.send(`<@!${mem.id}> entered setup mode`);


   let embed = new Discord.RichEmbed();
   embed.setAuthor(`What is your characters name?`);
   let data = []
   let msgname = await ch.send(embed)
   await ch.awaitMessages(response => msg.content, { max: 1,
     time: 180000, errors: ['time'] })
   .then((collected) => {
      if(collected.first().attachments.size > 0){
        data.push("Error found while parsing var, rerun &ch setup and pass valid argruments.");
        collected.first().delete();
      } else {
        data.push(collected.first().content.replace(/'/g, '"'));
        collected.first().delete();
      }

       })
       .catch(function(){
       ch.send('You didnt write your name in given time');
       ch.delete(10000)
     })


   embed.setAuthor('What is your characters age?')
   embed.setDescription(`Name: ${data[0]}`);
   await msgname.edit(embed)
   await ch.awaitMessages(response => msg.content, {max: 1, time: 180000, errors: ['time']})
   .then((collected) => {
     if(collected.first().attachments.size > 0){
       data.push("Error found while parsing var, rerun &ch setup and pass valid argruments.");
       collected.first().delete();
     } else {
       data.push(collected.first().content.replace(/'/g, '"'));
       collected.first().delete();
     }
   })
   .catch(function(){
     ch.send("You didn't write your age in given time.")
     ch.delete(10000)
   })


   embed.setAuthor('What is your characters gender?')
   embed.setDescription(`Name: ${data[0]} → Age: ${data[1]}`)
   await msgname.edit(embed)
   await ch.awaitMessages(response => msg.content, {max: 1, time: 180000, errors: ['time']})
   .then((collected) => {
     if(collected.first().attachments.size > 0){
       data.push("Error found while parsing var, rerun &ch setup and pass valid argruments.");
       collected.first().delete();
     } else {
       data.push(collected.first().content.replace(/'/g, '"'));
       collected.first().delete();
     }
   })
   .catch(function(){
     ch.send("You didn't write your gender in given time.")
     ch.delete(10000)
   })


   embed.setAuthor('What is your characters group?')
   embed.setDescription(`Name: ${data[0]} → Age: ${data[1]} → Gender: ${data[2]}`)
   await msgname.edit(embed)
   await ch.awaitMessages(response => msg.content, {max: 1, time: 180000, errors: ['time']})
   .then((collected) => {
     if(collected.first().attachments.size > 0){
       data.push("Error found while parsing var, rerun &ch setup and pass valid argruments.");
       collected.first().delete();
     } else {
       data.push(collected.first().content.replace(/'/g, '"'));
       collected.first().delete();
     }
   })
   .catch(function(){
     ch.send("You didn't write your group in given time.")
     ch.delete(10000)
   })

     //Name: ${data[0]} → Age: ${data[1]} → Gender: ${data[2]} → Race: ${data[3]}
     let slot = [];
     db.get(`select slot from [Players Guild(${g.id})] where player_id = '${mem.id}'`, function(err, get) {
       if(get == "undefined" || err) return Dsql.generate_tables();
       slot = get.slot;
       console.log(get.slot)
     })
     setTimeout(complete, 1000)
     function complete() {
       let keys = `set name = '${data[0]}', age = '${data[1]}', gender = '${data[2]}', race = '${data[3]}'`
       let where = `character_slot = '${slot}'`
       let query = ('update ' + `[Profile Player(${mem.id}) -> Guild(${g.id})] ` + keys + " where " + where)
       db.run(query)
       ch.delete()
       msg.reply(" now you can check your profile with &character/&ch");
       console.log(slot)
     }
  }
  list(mem, g, msg) {
    let list = [];
    db.each(`select * from [Profile Player(${mem.id}) -> Guild(${g.id})]`, function(err, each) {
      if(err) msg.channel.send("Failed, errored:\n\n" + err);
      list.push(`\`\`\`css\n[${each.character_slot}] --> [${each.name}]\n\`\`\``)
    })
    setTimeout(complete, 500);
    function complete() {
      let embed = new Discord.RichEmbed();
      embed.setDescription(list.join("\n"));
      msg.channel.send(embed)
      return;
    }
  }
  show(mem, g, msg) {
    db.get(`select slot from [Players Guild(${g.id})] where player_id = '${mem.id}'`, function(err, dt) {
      if(err || dt == "undefined" || !dt) return msg.channel.send("no data\n\n" + err)
      db.get(`select * from [Profile Player(${mem.id}) -> Guild(${g.id})] where character_slot = '${dt.slot}'`, function(err, get) {
        if(get == "undefined" || err || !get) return msg.channel.send("No character data found.");
        let embed = new Discord.RichEmbed();
        let data = [];
        data.push(`**\`Name:\`** __\`${get.name}\`__`)
        data.push(`**\`Age:\`** __\`${get.age}\`__`)
        data.push(`**\`Gender:\`** __\`${get.gender}\`__`)
        data.push(`**\`Group:\`** __\`${get.race}\`__`)
        if(get.bio) embed.addField("`Bio`", get.bio);
        if(get.image) embed.setThumbnail(get.image);
        if(get.quote) embed.setFooter('"' + get.quote.replace(/@quote/g, "'") + '"');
        embed.setColor("AQUA");
        if(get.color) embed.setColor(get.color)
        embed.setDescription(data.join("\n"));

        msg.channel.send(embed);
        return;
      })
    })

  }
  switch(mem, g, msg, search) {
    let slot;
    let result;
    setTimeout(complete, 500);
    db.each(`select * from [Profile Player(${mem.id}) -> Guild(${g.id})]`, function(err, row) {
      if(row.name.toLowerCase().includes(search.toLowerCase()) || row.character_slot == search){
         slot = (row.character_slot)
         result = (row.name)
       }
    })
    function complete() {
      if(slot == null) return msg.channel.send("Character not found.")
      db.run(`update [Players Guild(${g.id})]
              set slot = '${slot}'
              where player_id = '${mem.id}'`);
      let embed = new Discord.RichEmbed();
      embed.setDescription(`**You've changed to** **\`${result}\`**`)
      msg.channel.send(embed)
      return "success";
    }
  }
  async add(mem, g, msg, args) {
    if(args.length < 1) return msg.channel.send("invalid args");
    let update = new Discord.RichEmbed()
    update.setAuthor(`Update/Add`, msg.author.avatarURL);
    if(['bio','desc','background','description'].includes(args[0].toLowerCase())) {
      if(Functions.clean(args.join(' ').slice(args[0].length)).length > 1000) return msg.channel.send("you can use document links as reference, due to discord limits we cannot post this bio in your profile.");
      db.each(`select * from [Players Guild(${g.id})] where player_id = '${mem.id}'`, function(error, pd) {
        db.run(`update [Profile Player(${mem.id}) -> Guild(${g.id})]
                set bio = '${Functions.clean(args.join(' ').slice(args[0].length))}'
                where character_slot = '${pd.slot}'`);
        update.setDescription(`__\`Bio\`__ updated`)

        msg.channel.send(update);
      })
    } else if(['image','picture','reference','ref','pic'].includes(args[0].toLowerCase())) {
      if(msg.attachments.size < 1 ) {
        var request = require('request');
        var url = args[1];
        var magic = {
            jpg: 'ffd8ffe0',
            png: '89504e47',
            gif: '47494638',
        };
        var options = {
            method: 'GET',
            url: url,
            encoding: null // keeps the body as buffer
        };

        request(options, function (err, response, body) {
            if(!err && response.statusCode == 200){
                var magigNumberInBody = body.toString('hex',0,4);
                if (magigNumberInBody == magic.jpg ||
                    magigNumberInBody == magic.png ||
                    magigNumberInBody == magic.gif || args[1].startsWith('http')) {

                  let url = args[1]
                  db.each(`select * from [Players Guild(${g.id})] where player_id = '${mem.id}'`, function(error, pd) {
                    db.run(`update [Profile Player(${mem.id}) -> Guild(${g.id})]
                            set image = '${url}'
                            where character_slot = '${pd.slot}'`);
                    update.setDescription(`__\`Image\`__ updated`)

                    msg.channel.send(update);
                })
              } else {
                msg.channel.send("invalid args");
                return;
              }
          }
        });
      } else if(msg.attachments.size > 0){
        let im = await msg.guild.members.get('500662838289760256').send("some text", {
          file: msg.attachments.first().url // Or replace with FileOptions object
        });
        db.each(`select * from [Players Guild(${g.id})] where player_id = '${mem.id}'`, function(error, pd) {;
          db.run(`update [Profile Player(${mem.id}) -> Guild(${g.id})]
                  set image = '${im.attachments.first().url}'
                  where character_slot = '${pd.slot}'`);
          update.setDescription(`__\`Image\`__ updated`)

          msg.channel.send(update);
        })
      } else {
        msg.channel.send("invalid args");
        return;
      }
    } else {
      msg.channel.send("invalid args");
      return;
    }
  }
  show_stats(mem, g, msg) {
    db.get(`select slot from [Players Guild(${g.id})] where player_id = '${mem.id}'`, function(err, dt) {
      if(err || dt == "undefined" || !dt) return msg.channel.send("no data\n\n" + err)
      db.get(`select * from [Stats Player(${mem.id}) -> Guild(${g.id})] where character_slot = '${dt.slot}'`, function(err, get) {
        db.get(`select * from [Profile Player(${mem.id}) -> Guild(${g.id})] where character_slot = '${dt.slot}'`, function(err, get2) {
          if(get2 == "undefined" || err || !get2) return msg.channel.send("No character data found.");


        if(get == "undefined" || err || !get) {
          Dsql.generate_tables();
          Dsql.Init_Stats(mem, g, dt.slot);
          Dsql.Init_Inventory(mem, g, dt.slot);
          return msg.channel.send("No data found, generating new table.\n\n" + err);
        }

        let stats = new Discord.RichEmbed();
        let data = [];
        stats.setAuthor(`${get2.name}`, get2.image || mem.avatarURL);
        data.push(`[**Health → ${get.health_current}/${get.health_max}**]`)
        data.push(`[**Stamina → ${get.stamina_current}/${get.stamina_max}**]`)
        data.push(`[**Mana → ${get.mana_current}/${get.mana_max}**]\n`)
        if(get.level) {
          stats.addField(`\`Lvl: ${get.level}\``,`**[${get.xp}/${get.level*10}]**`, true);
        }
        data.push(`__\`Roll-Bonuses\`__\n**Strength: ${get.strength}**\n**Speed: ${get.speed}**\n**Talking: ${get.talking}**\n**Armor: ${get.armor}**\n**ATK-BASE: ${get.attack_base}**`)
        if(get.balance_premium) {
          stats.addField("`Currency`", `Premium -> ${get.balance_premium}\nCash -> ${get.balance}`, true)
        } else {
          stats.addField("`Currency`", `Cash -> ${get.balance}`, true)
        }
        if(!(get.equiped_id) == "0" && get.equiped_id) data.push(`\`Equiped\` -> \`WIP\``);
        stats.setDescription(data.join(" "));
        return msg.channel.send(stats);
        })
      })
    })

  }
  Load_Inv(mem, g, msg) {
    db.get(`select slot from [Players Guild(${g.id})] where player_id = '${mem.id}'`, function(err, dt) {
      if(err || dt == "undefined" || !dt) return msg.channel.send("no data\n\n" + err);
      let invdata = [];
      db.each(`select * from [Inventory Slot(${dt.slot}) Player(${mem.id}) Guild(${g.id})] order by item_id asc;`, function(err2, inv) {
        if(err2 || inv == "undefined" || !inv) {
          Dsql.generate_tables();
          Dsql.Init_Stats(mem, g, dt.slot);
          Dsql.Init_Inventory(mem, g, dt.slot);
           return msg.channel.send("no inventory, creating tables now\n\n" + err2);
         }
         db.get(`select * from [Items Guild(${g.id})] where item_id = '${inv.item_id}' order by item_id asc;`, function(err3, it) {
           invdata.push(`**(${it.item_id})**__\`${it.item_name}\`__ **->** **\`[${inv.item_amount}]\`**`)
         })

      })
      setTimeout(next, 500)
      function next() {
        let embed = new Discord.RichEmbed();
        embed.setAuthor("Your inventory:");
        if(invdata.join("\n").length > 1025) {
          let count = 0;
          let tok = [];
          invdata.forEach(dat => {
            if(count < 26){
               tok.push(dat)
               count = count + 1
            } else {
              embed.setDescription(tok.join("\n"));
              msg.channel.send(embed);
              count = 0;
            }
          })
        } else {
          embed.setDescription(" " + invdata.join("\n"))
          msg.channel.send(embed)
        }

      }
    })
  }
}
module.exports = PF;
