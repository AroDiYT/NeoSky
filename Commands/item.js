module.exports = {
  name: "item",
  aliases: ['i'],

  desc: "Item Command",

  chainable: false,
  argruments: ['```css\n[item search] -> [Finds an item in our database.]\n```','```css\n[item addto] -> [adds item to ones inventory (admin)]\n```','```css\n[item new] -> [creates new item.(admin)]\n```'],

  category: "RPG",

  permissions: "",

  async execute(msg, args) {
    if(args[0] == "search") {
      args.shift();
    if(args.length < 1) return msg.channel.send("Provide search term.");
      Dsql.Get_Item(msg.guild, msg, args.join(' '))
    } else if(args[0] == "addto") {
      args.shift();
      if(!['339475044172431360','694104913210245240','500662838289760256','434824856161484800','152844642809937920'].includes(msg.author.id))
      return msg.channel.send("not for you.")
      if(args.length < 1) return msg.channel.send("You need to provide args.")
      if(msg.mentions.users.first()) {
        Dsql.Give_item(msg.mentions.users.first(), msg.guild, msg, args.join(' ').slice(23))
      } else {
        Dsql.Give_item(msg.author, msg.guild, msg, args.join(' '))
      }
    } else if(args[0] == "new") {
      args.shift()
      if(['339475044172431360','694104913210245240','500662838289760256','434824856161484800','152844642809937920'].includes(msg.author.id)) {
        Item.new_item(msg.author, msg.guild, msg)
      } else {
        msg.channel.send("not for you.")
      }
    }
  },

  async chain(msg, args) {

  }

}
