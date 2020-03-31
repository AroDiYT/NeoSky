module.exports = {
  name: "item",
  aliases: ['i'],

  desc: "find item data",

  chainable: false,
  argruments: ['none'],

  category: "",

  permissions: "",

  async execute(msg, args) {
    if(args.length < 1) return msg.channel.send("Provide search term.");
      Dsql.Get_Item(msg.guild, msg, args.join(' '))
  },

  async chain(msg, args) {

  }

}
