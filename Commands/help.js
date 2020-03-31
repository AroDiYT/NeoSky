module.exports = {
  name: "help",
  aliases: ['?'],

  desc: "Showing all commands/catagories",

  chainable: false,
  argruments: [''],

  category: "",

  permissions: "",

  async execute(msg, args) {
    if(args.length < 1) {
         let fs = require('fs')

         let dir = "/home/darii-chan/SourceCode/Discord Applications/Node Applications/NeoSky/Bot #1/Commands"

         let c = fs.readdirSync(dir)
         .filter(file => file.endsWith('js'));

         const cats = {} /* since we won't assign to it it should be fine as cosnt */

         for (const f of c) {
           const cmd = require(`${dir}/${f}`)
           if (cmd.category && !cats[cmd.category]) {
             cats[cmd.category] = []
           }
           if (cmd.category)
           cats[cmd.category].push(cmd);
         }
         let embed = new Discord.RichEmbed();
         let fields = [];
         for(const ct in cats) {
         fields.push(`**~>** **__\`${ct}\`__**`);
         }
         embed.setAuthor(`Command→Help`, msg.author.avatarURL)
         embed.setDescription(`Below are all categories listed, to see one of these categories you can use following command.

                               __&help (category name)__

                               ${fields.join("\n")}`)
         embed.setColor('PURPLE');

         msg.channel.send(embed)
       } else {
         let fs = require('fs')

         let dir = "/home/darii-chan/SourceCode/Discord Applications/Node Applications/NeoSky/Bot #1/Commands"

         let c = fs.readdirSync(dir)
         .filter(file => file.endsWith('js'));

         const cats = {} /* since we won't assign to it it should be fine as cosnt */

         for (const f of c) {
           const cmd = require(`${dir}/${f}`)
           if (cmd.name && !cats[cmd.name]) {
             cats[cmd.name] = []
           }

           if (cmd.name && cmd.aliases && cmd.category){
             let cmddata = {
               name: `${cmd.name}`,
               description: `${cmd.desc}`,
               aliases: `${cmd.aliases.join(', ')}`,
               category: `${cmd.category}`,
               argruments: `${cmd.argruments}`
             }
             cats[cmd.name].push(cmddata);
           }else if (cmd.name && cmd.aliases){
             let cmddata = {
               name: `${cmd.name}`,
               description: `${cmd.desc}`,
               aliases: `${cmd.aliases.join(', ')}`,
               argruments: `${cmd.argruments}`
             }
             cats[cmd.name].push(cmddata);
           } else if (cmd.name && cmd.category){
               let cmddata = {
                 name: `${cmd.name}`,
                 description: `${cmd.desc}`,
                 category: `${cmd.category}`,
                 argruments: `${cmd.argruments}`
               }
               cats[cmd.name].push(cmddata);
           } else if (cmd.name){
             let cmddata = {
               name: `${cmd.name}`,
               description: `${cmd.desc}`,
               argruments: `${cmd.argruments}`
             }
             cats[cmd.name].push(cmddata);
           }
         }


           let ctd = [];
           for (const f of c) {
             const cmd = require(`${dir}/${f}`)
             if (cmd.category.toLowerCase() === args[0].toLowerCase()) {
               ctd.push(cmd.name)
             }
           }


         if(cats[args[0].toLowerCase()]) {

           let embed = new Discord.RichEmbed();
           if(cats[args[0]][0].category) {
             embed.setDescription(`**__${cats[args[0]][0].category}__** → **${cats[args[0].toLowerCase()][0].name}** → ` + cats[args[0].toLowerCase()][0].description);
           } else {
             embed.setDescription(cats[args[0].toLowerCase()][0].description);
           }
           if(cats[args[0]][0].aliases)
           embed.addField("Aliases", cats[args[0]][0].aliases);
           embed.addField("Args", cats[args[0]][0].argruments.replace(/,/g, ""));

           embed.setColor('PURPLE');

           msg.channel.send(embed)

         } else if (ctd.length > 0) {

           let embed = new Discord.RichEmbed();
           embed.setDescription(`\`${args[0].toLowerCase()}\`\nBelow are all commands of this category listed, to see individual information of these commands you can use following command.\n
           __&help (command name)__`);
           embed.addField("Commands", "**~>** **\`" + ctd.join('\`**\n**~>** **\`') + "\`**");
           embed.setColor('PURPLE');

           msg.channel.send(embed)

         } else {

           msg.channel.send("Invalid Input")

         }
       }
  }

}
