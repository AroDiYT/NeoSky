const nou = ['EEK! <@500662838289760256> HELP, SOMEONE TRYING TO T-TOUCH ME-', 'N-no.. y-you are not my master!', 'The one that tried my say command thinking they are allowed is gay-',"D-dont peek at me perv!","Y-you f-forcing me to say stuff.. m-meany..","W-why w-would you wan-want me to s-say that.."]
module.exports = {

  name: "count",

  aliases: ["length"],

  desc: "Its going to calculate the amount of characters in your given text",

  chainable: false,
  argruments: [''],

  category: "Basic",

  permissions: "",

  async execute(msg, args) {
    if(args.length < 1) {
      msg.channel.send("Invalid input")
    } else {
      let words = args.length;
      let characters = args.join(' ').split('').length;
      let embed = new Discord.RichEmbed();
      embed.setAuthor(msg.author.username, msg.author.avatarURL);
      embed.addField("Your message", "Includes:\n" + `Words → ${words}\nCharacters → ${characters}\nXp gain → ${Math.floor(characters/5)}`);
      embed.setColor('RANDOM');
      msg.channel.send(embed)
    }

  }

}
