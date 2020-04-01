module.exports = {
  name: "character",
  desc: "This command follows up on all profile based functions.",

  aliases: ['c'],

  cat: "basic",

  subs: ['(none)',
  '@mention', 'list', 'new', 'setup', 'to', 'add', 'set', 'stats', 'inventory', 'all'],
  subsinfo: ['Shows basic profile',
  'Shows other players (list) of characters or (profile).',
  'Shows your list of characters [Alias: ls]','Creates a new characters.',
  'Edits current character.','Switch between your characters using name or slot',
  'Add a (bio) or (image) to your profile.','set your profiles (color) or (quote)',
  'Shows your overview of stats.','Shows your inventory [Alias: inv]',
  'Shows your stats, profile and inventory at once. [Alias: p]'],


  async execute(msg, args) {
    if(args.length < 1) {
      Pfsql.show(msg.author, msg.guild, msg);
    } else if (!msg.mentions.users.first()){
      if(args[0] == "new"){
        await Dsql.Insert_NewSlot(msg.author, msg.guild)
        setTimeout(logged, 500)
        function logged() {
          Pfsql.setup_new(msg.author, msg.guild, msg);
        }

      } else if(args[0] == "list" || args[0] == "ls") {
        Pfsql.list(msg.author, msg.guild, msg)
      } else if(args[0] == "setup") {
        Pfsql.setup(msg.author, msg.guild, msg)
      } else if(args[0] == "to") {
        Pfsql.switch(msg.author, msg.guild, msg, args.join(' ').slice(args[0].length + 1))
      } else if(args[0] == "add") {
        let lol = args.shift().toLowerCase();
        Pfsql.add(msg.author, msg.guild, msg, args)
      } else if(args[0] == "set" && args[1] == "color") {
        let colors = ['AQUA','GREEN','BLUE','PURPLE','GOLD','ORANGE','RED','GREY','DARKER_GREY','NAVY','DARK_AQUA','DARK_GREEN','DARK_BLUE','DARK_PURPLE','DARK_GOLD','DARK_ORANGE','DARK_RED','DARK_GREY','LIGHT_GREY','DARK_NAVY','LUMINOUS_VIVID_PINK','DARK_VIVID_PINK']
        if(!colors.includes(args[2].toUpperCase())) return msg.channel.send("must be one of following colors. \n" + colors.join(', '))
        let mem = msg.author;
        let g = msg.guild;
          db.get(`select slot from [Players Guild(${g.id})] where player_id = '${mem.id}'`, function(err, dt) {
            if(err) return msg.channel.send("no data\n\n" + err)
            db.run(`update [Profile Player(${mem.id}) -> Guild(${g.id})]
                    set color = '${args[2].toUpperCase()}'
                    where character_slot = '${dt.slot}'`)
          })
          msg.channel.send("Color updated.")
      } else if(args[0] == "set" && args[1] == "quote") {
        let quote = args.join(' ').slice(10);
        let mem = msg.author;
        let g = msg.guild;
        db.get(`select slot from [Players Guild(${g.id})] where player_id = '${mem.id}'`, function(err, dt) {
          if(err) return msg.channel.send("no data\n\n" + err)
          db.run(`update [Profile Player(${mem.id}) -> Guild(${g.id})]
                  set quote = '${Functions.clean(quote)}'
                  where character_slot = '${dt.slot}'`)
        })
        msg.channel.send("Quote updated.")
      } else if (args[0] == "stats") {
        Pfsql.show_stats(msg.author, msg.guild, msg)
      } else if (args[0] == "inv" || args[0] == "inventory") {
        Pfsql.Load_Inv(msg.author, msg.guild, msg);
      } else if(args[0] == "p" || args[0] == "all") {
        Pfsql.show(msg.author, msg.guild, msg);
        Pfsql.show_stats(msg.author, msg.guild, msg);
        Pfsql.Load_Inv(msg.author, msg.guild, msg);
      }
    } else if(args[1] == "list") {
      Pfsql.list(msg.mentions.users.first(), msg.guild, msg)
    } else if(args[1] == "new" && ['339475044172431360','694104913210245240','500662838289760256','434824856161484800','152844642809937920'].includes(msg.author.id)){
      await Dsql.Insert_NewSlot(msg.mentions.users.first(), msg.guild)
      setTimeout(logged, 500)
      function logged() {
        Pfsql.setup_new(msg.mentions.users.first(), msg.guild, msg);
      }
    } else  {
      Pfsql.show(msg.mentions.users.first(), msg.guild, msg)
    }
  },

}
