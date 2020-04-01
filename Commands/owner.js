module.exports = {
  name: "owner",
  desc: "Owner Category",

  aliases: ['o'],

  cat: "Developer",

  subs: ['eval'],
  subsinfo: ['EValuates Javascript Code'],


  async execute(msg, args) {
    if(!['339475044172431360','500662838289760256','694104913210245240'].includes(msg.author.id)) return msg.channel.send("What tf you tryna do?")
    if(!args[0].startsWith("eval")) return msg.channel.send('no');
    try {
      let text = msg.content.slice(7)
      if(!text.includes("```")) return console.log(text)
      const code = text.replace(/```/g, '//this ');
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      msg.channel.send(Functions.clean(evaled), {code:"xl"});
    } catch (err) {
      msg.channel.send(`\`ERROR\` \`\`\`xl\n${Functions.clean(err)}\n\`\`\``);
    }
  }

}
