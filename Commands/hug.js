module.exports = {
  name: "hug",
  desc: "Hug the people that deserve it! or need it!",

  aliases: null,

  cat: "emote",

  subs: null,
  subsinfo: null,


  async execute(msg, args) {
    if(msg.mentions.users.first()) {
    let embed = new Discord.RichEmbed()
    embed.setDescription(`${msg.author}\n**\`hugs\`**\n ${msg.mentions.users.array().join(', ')}`);
    embed.setColor('RANDOM');
    let gif = await neko.sfw.hug();
    embed.setImage(gif.url)
    msg.channel.send(embed)
    }

  }

}
