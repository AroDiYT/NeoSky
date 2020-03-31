module.exports = {
  name: "hug",
  aliases: ['huggies'],

  desc: "hug your friends or loved ones-",

  chainable: true,
  argruments: ['mention -> @user'],

  category: "emotes",

  permissions: "none",

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
