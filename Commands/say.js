module.exports = {
  name: "say",
  aliases: ['speak'],
  desc: "This command takes argruments from your input and makes the bot repeat it.",
  chainable: true,
  argruments: ['Text -> plain text'],
  category: "Basic",
  permissions: "MANAGE_MESSAGES",

  async execute(msg, args) {
    if(args.length < 1) return msg.channel.send('Input invalid, please add argruments to use this command correctly.');
    msg.channel.send(args.join(' '));
    msg.delete(100)
  }
}
