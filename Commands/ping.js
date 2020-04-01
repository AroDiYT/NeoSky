module.exports = {
  name: "ping",
  desc: "returns pong;",

  aliases: ['pong'],

  cat: "basic",

  subs: null,
  subsinfo: null,

  async exec(msg, args) {
    msg.reply(new Date().getTime() - msg.createdTimestamp + " ms")
  }
}
