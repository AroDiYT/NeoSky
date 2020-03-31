class DB {

  generate_tables() {

    let gs = client.guilds.array()

    gs.forEach(g => {

      db.run(`create table if not exists [Players Guild(${g.id})]
             (player_id unsigned big int primary key, slot unsigned integer, ran_setup text)`)

      db.run(`create table if not exists [Channels Guild(${g.id})]
             (channel_id unsigned big int primary key, channel_category text, channel_bonus integer)`)

      db.run(`create table if not exists [Items Guild(${g.id})]
            (item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name text, item_desc text,
             item_value integer , item_category text, item_effect_value unsigned integer, item_image text)`)

     db.run(`create table if not exists [Statistics Guild(${g.id})]
             (player_id unsigned big int primary key, msg_amount unsigned integer, rp_amount unsigned integer)`)

      let ms = g.members.array();

      ms.forEach(mem => {
        setTimeout(next, 2000)
        function next() {
          db.run(`insert or ignore into [Players Guild(${g.id})] (player_id, slot, ran_setup) values ('${mem.id}', '1', 'false')`)
        }

        db.run(`create table if not exists [Profile Player(${mem.id}) -> Guild(${g.id})]
               (character_slot unsigned integer primary key,
               name text, age text, race text, gender text,
               image text, bio text, quote text, color text, ran_setup text)`)

        db.run(`create table if not exists [Stats Player(${mem.id}) -> Guild(${g.id})]
               (character_slot unsigned integer primary key,
                health_max unsigned integer, health_current unsigned integer,
                stamina_max unsigned integer, stamina_current unsigned integer,
                mana_max unsigned integer, mana_current unsigned integer,
                level unsigned integer, xp unsigned integer, armor unsigned integer,
                speed unsigned integer, strength unsigned integer, talking unsigned integer,
                attack_base unsigned integer, equiped_id unsigned integer, balance_premium unsigned integer,
                balance unsigned integer)`)

        db.run(`create table if not exists [Inventory Slot(1) Player(${mem.id}) Guild(${g.id})]
                (item_id unsigned integer primary key, item_amount unsigned integer)`)
        db.run(`create table if not exists [Inventory Slot(2) Player(${mem.id}) Guild(${g.id})]
                (item_id unsigned integer primary key, item_amount unsigned integer)`)
        db.run(`create table if not exists [Inventory Slot(3) Player(${mem.id}) Guild(${g.id})]
                (item_id unsigned integer primary key, item_amount unsigned integer)`)
        db.run(`create table if not exists [Inventory Slot(4) Player(${mem.id}) Guild(${g.id})]
                (item_id unsigned integer primary key, item_amount unsigned integer)`)

      })

    })
    console.log("loading tables")
  }
  Init_Inventory(player, guild, slot) {
    db.run(`create table if not exists [Inventory Slot(${slot}) Player(${player.id}) Guild(${guild.id})]
            (item_id unsigned integer primary key, item_amount unsigned integer)`)
    return "success";
  }
  Insert_NewSlot(mem, g) {
    let amount = [];
    setTimeout(complete, 500);
     db.each(`SELECT count(*) FROM [Profile Player(500662838289760256) -> Guild(${g.id})]
     WHERE  ran_setup = "true";
    `, (err, row) => {
        amount = row['count(*)']
    })
    function complete() {
      if(amount.length > 20) return;
      db.run(`update [Players Guild(${g.id})]
              set slot = '${amount.length}'
              where player_id = '${mem.id}'`);
      return "success";
    }
  }
  Init_Stats(mem, g, slot) {
    setTimeout(runthis, 1000)
    function runthis() {
      db.get(`select ran_setup from [Profile Player(${mem.id}) -> Guild(${g.id})] where character_slot = '${slot}'`, function(error, get) {
        if(get == "undefined" || !get || error) return console.log(error);
          db.run(`insert or ignore into [Stats Player(${mem.id}) -> Guild(${g.id})]
           (character_slot, health_max, health_current, stamina_max,
            stamina_current, mana_max, mana_current, level, xp,
            armor, speed, strength, talking, attack_base,
            balance) values
            ('${slot}','100','100','60','60','20','20','1','1','0','2','2','2','2','100')`)
            return console.log("success");
      })
    }

  }
  Add_Item(guild, name, desc, value, category, effect_value, img) {
    db.run(`insert into [Items Guild(${guild.id})] (item_name, item_desc,
     item_value, item_category, item_effect_value, item_image) values ('${name}','${desc}','${value}','${category}','${effect_value}','${img}')`);
     return console.log("success");
  }
  Give_item(mem, g, msg, item) {
    db.get(`select slot from [Players Guild(${g.id})] where player_id = '${mem.id}'`, function(err, pg) {
      if(pg == "undefined" || !pg || err) return console.log(err);
      let state = "lol";
      let st2 = "lol";
      db.each(`select * from [Items Guild(${g.id})]`, function(err, get) {
        if(get == "undefined" || !get || err) return generate_tables();
        if(get.item_id == item || get.item_name.toLowerCase().includes(item.toLowerCase())) state = get.item_id;
      })
      setTimeout(next, 500)
      function next() {
        if(state == "lol") return msg.channel.send("Invalid item.")
        db.each(`select * from [Inventory Slot(${pg.slot}) Player(${mem.id}) Guild(${g.id})]`, function(err, qch) {
          if(qch == "undefined" || !qch || err) return console.log(err);
          if(qch.item_id == state) st2 = (qch.item_amount + 1);
        })
        setTimeout(next2, 500)
      }
      function next2() {
        if(st2 == "lol") {
          db.run(`insert or ignore into [Inventory Slot(${pg.slot}) Player(${mem.id}) Guild(${g.id})] (item_id, item_amount) values ('${state}','1')`);
          return msg.channel.send("Item added to inventory.");
        } else if(st2 > 0){
          db.run(`update [Inventory Slot(${pg.slot}) Player(${mem.id}) Guild(${g.id})] set item_amount = '${st2}' where item_id = '${state}'`);
          return msg.channel.send("Item added to inventory.");
        }
      }
    })
  }
  Get_Item(g, msg, search) {
    let state = "lol"
    db.each(`select * from [Items Guild(${g.id})]`, function(err, get) {
      if(get == "undefined" || !get || err) return generate_tables();
      if(get.item_id == search || get.item_name.toLowerCase().includes(search.toLowerCase())) state = get;
    })
    function runthis() {
      if(state == "lol" || !state || state == "undefined") return msg.channel.send("Item not found");
      let embed = new Discord.RichEmbed();
      embed.setAuthor(`→ ${state.item_name}`);
      embed.setDescription(`*${state.item_desc}*\n\n\`Category => ${state.item_category}\`\n\`Value => ${state.item_value}\`\n\`(damage,heal,defense)value => ${state.item_effect_value}\``);
      embed.setThumbnail(state.item_image);
      msg.channel.send(embed);
    }
    setTimeout(runthis,500)
  }


}

module.exports = DB;
