module.exports = {
  name: "addto",
  aliases: ['at'],

  desc: "give item to player, admin only.",

  chainable: false,
  argruments: ['Itemname/id'],

  category: "owner",

  permissions: "admin",

  async execute(msg, args) {
    if(!['339475044172431360','694104913210245240','500662838289760256','434824856161484800','152844642809937920'].includes(msg.author.id))
    return msg.channel.send("not for you.")
    if(args.length < 1) return msg.channel.send("You need to provide args.")
    if(msg.mentions.users.first()) {
      Dsql.Give_item(msg.mentions.users.first(), msg.guild, msg, args.join(' ').slice(23))
    } else {
      Dsql.Give_item(msg.author, msg.guild, msg, args.join(' '))
    }

  },

  async chain(msg, args) {

  }

}
