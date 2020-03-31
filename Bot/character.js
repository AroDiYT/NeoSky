module.exports = {
  name: "character",
  aliases: ['ch','pf','me'],

  desc: "The character module.",

  chainable: false,
  argruments: ['__&ch (@mention) option (args)__\n', '**Options:** (mention only works with LIST and just &ch @user)',
  '```css\n[ch new] --> [new character]\n```','```css\n[ch setup] --> [edit current char]\n```',
   '```css\n[ch list] --> [list all chars]\n```','```css\n[ch to (name or slot)] --> [changes character]\n```',
   '```css\n[ch add (bio or image) (link/upload)] \n--> [changes characters BIO or IMAGE]\n```','```css\n[ch set color (color_name)] --> [changes embed color]\n```','```css\n[ch] --> [shows current profile]\n```'],

  category: "RPG",

  permissions: "none",

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
      }
    } else if(args[1] == "list") {
      Pfsql.list(msg.mentions.users.first(), msg.guild, msg)
    } else {
      Pfsql.show(msg.mentions.users.first(), msg.guild, msg)
    }
  },

}
