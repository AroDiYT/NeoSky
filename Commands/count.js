module.exports = {
  name: "count",
  desc: "gets a count display of stats of given message.",

  aliases: null,

  cat: "basic",

  subs: null,
  subsinfo: null,


  async execute(msg, args) {
    if(args.length < 1) {
      msg.channel.send("Invalid input")
    } else {
      let words = args.length;
      let characters = args.join(' ').split('').length;
      let embed = new Discord.RichEmbed();
      embed.setAuthor(msg.author.username, msg.author.avatarURL);
      embed.addField("Your message", "Includes:\n" + `Words → ${words}\nCharacters → ${characters}`);
      embed.setColor('RANDOM');
      msg.channel.send(embed)
    }

  }

}
