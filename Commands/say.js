module.exports = {
  name: "say",
  aliases: ['speak'],
  desc: "This command takes argruments from your input and makes the bot repeat it.",
  chainable: true,
  argruments: ['Text -> plain text'],
  category: "Basic",
  permissions: "MANAGE_MESSAGES",

  async execute(msg, args) {
    if(args[0] == "to") {
      args.shift();
      if(!msg.mentions.users.first()) return msg.channel.send('you have to mention a user (&speak to @user (text))');
      args.shift();
      if(args.length < 1 ) return msg.channel.send("you didn't provide enough argruments.")
      msg.mentions.users.first().send(`\`${msg.author.tag} sends a msg\`\n` + args.join(' '));
      msg.channel.send("Message is send.");
      msg.delete()
    } else {
      if(args.length < 1) return msg.channel.send("you didn't provide enough argruments.");
      msg.delete();
      msg.channel.send(args.join(' '))
    }
  }
}
