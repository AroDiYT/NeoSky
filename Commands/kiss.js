module.exports = {
  name: "kiss",
  desc: "Kiss someone you like/love!",

  aliases: null,

  cat: "emote",

  subs: null,
  subsinfo: null,


  async execute(msg, args) {
    if(msg.mentions.users.first()) {
    let embed = new Discord.RichEmbed()
    embed.setDescription(`${msg.author}\n**\`kisses\`**\n ${msg.mentions.users.array().join(', ')}`);
    embed.setColor('RANDOM');
    let gif = await neko.sfw.kiss();
    embed.setImage(gif.url)
    msg.channel.send(embed)
    }

  }

}
