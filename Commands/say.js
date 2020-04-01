module.exports = {
  name: "say",
  desc: "Responds with given argruments.",

  aliases: ['speak'],

  cat: "basic",

  subs: ['to'],
  subsinfo: ['The bot dms the player with your message.'],


  async exec(msg, args) {
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
