module.exports = {
  name: "ping",
  aliases: ['pong'],

  desc: "This shows our PING",

  chainable: true,
  argruments: ['none'],

  category: "Basic",

  permissions: "none",

  async execute(message, args) {
    message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");
  }

}
