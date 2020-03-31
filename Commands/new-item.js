module.exports = {
  name: "new-item",
  aliases: ['item-new'],

  desc: "creates a new item",

  chainable: false,
  argruments: ['none'],

  category: "owner",

  permissions: "owner",

  async execute(msg, args) {
    if(['339475044172431360','694104913210245240','500662838289760256','434824856161484800','152844642809937920'].includes(msg.author.id)) {
      Item.new_item(msg.author, msg.guild, msg)
    } else {
      msg.channel.send("not for you.")
    }
  },

  async chain(msg, args) {

  }

}
