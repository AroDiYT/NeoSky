class ITEM {
  async new_item(mem, g, msg) {
    const ch = await msg.channel.guild.createChannel(mem.tag + "-item", {
                   type: 'text',
                   permissionOverwrites: [
                       {
                           id: msg.guild.defaultRole,
                           deny: ['READ_MESSAGES']
                       },
                       {
                           id: mem.id,
                           allow: ['READ_MESSAGES', 'SEND_MESSAGES']
                       },
                       {
                           id: '688492645877940333', /* @manager */
                           allow: ['READ_MESSAGES', 'SEND_MESSAGES', 'MANAGE_MESSAGES']
                       }
                   ]
               })
               if (!ch)
                   return msg.channel.send('error while entering setup: couldnt create channel')
               ch.send(`<@!${mem.id}> create your item here.`);
               let embed = new Discord.RichEmbed();
               embed.setAuthor(`What is your items name?`);
               let data = []
               let msgname = await ch.send(embed)
               await ch.awaitMessages(response => msg.content, { max: 1,
                 time: 180000, errors: ['time'] })
               .then((collected) => {
                 if(collected.first().attachments.size > 0){
                   msg.reply("No")
                   collected.first().delete();
                   return ch.delete();
                 } else {
                   data.push(collected.first().content.replace(/'/g, '"'));
                   collected.first().delete();
                 }
                   })
                   .catch(function(){
                   msg.reply('You didnt write the data in given time');
                   ch.delete(10000)
                 })
                 embed.setAuthor('What is your items description')
                 embed.setDescription(`Name: ${data[0]}`);
                 await msgname.edit(embed)
                 await ch.awaitMessages(response => msg.content, { max: 1,
                   time: 180000, errors: ['time'] })
                 .then((collected) => {
                   if(collected.first().attachments.size > 0){
                     msg.reply("No")
                     collected.first().delete();
                     return ch.delete();
                   } else {
                     data.push(collected.first().content.replace(/'/g, '"'));
                     collected.first().delete();
                   }
                     })
                     .catch(function(){
                     msg.reply('You didnt write the data in given time');
                     ch.delete(10000)
                   })
                   embed.setAuthor('What is your items value(cost in shop)')
                   embed.setDescription(`Name: ${data[0]}\nDesc: ${data[1]}`);
                   await msgname.edit(embed)
                   await ch.awaitMessages(response => msg.content, { max: 1,
                     time: 180000, errors: ['time'] })
                   .then((collected) => {
                     if(collected.first().attachments.size > 0){
                       msg.reply("No")
                       collected.first().delete();
                       return ch.delete();
                     } else {
                       data.push(collected.first().content.replace(/'/g, '"'));
                       collected.first().delete();
                     }
                       })
                       .catch(function(){
                       msg.reply('You didnt write the data in given time');
                       ch.delete(10000)
                     })
                     embed.setAuthor('What is your items category(weapon, food, armor)')
                     embed.setDescription(`Name: ${data[0]}\nDesc: ${data[1]}\nValue: ${data[2]}`);
                     await msgname.edit(embed)
                     await ch.awaitMessages(response => msg.content, { max: 1,
                       time: 180000, errors: ['time'] })
                     .then((collected) => {
                       if(collected.first().attachments.size > 0 || !['armor','weapon','food'].includes(collected.first().content)){
                         msg.reply("No")
                         collected.first().delete();
                         return ch.delete();
                       } else {
                         data.push(collected.first().content.replace(/'/g, '"'));
                         collected.first().delete();
                       }
                         })
                         .catch(function(){
                         msg.reply('You didnt write the data in given time');
                         ch.delete(10000)
                       })
                       embed.setAuthor(`How much (damage(weapon), healing(food), defense(armor)) should the item do? respond with only a number.`)
                       embed.setDescription(`Name: ${data[0]}\nDesc: ${data[1]}\nValue: ${data[2]}\nCategory: ${data[3]}`);
                       await msgname.edit(embed)
                       await ch.awaitMessages(response => msg.content, { max: 1,
                         time: 180000, errors: ['time'] })
                       .then((collected) => {
                         if(collected.first().attachments.size > 0){
                           msg.reply("No")
                           collected.first().delete();
                           return ch.delete();
                         } else {
                           data.push(collected.first().content.replace(/'/g, '"'));
                           collected.first().delete();
                         }
                           })
                           .catch(function(){
                           msg.reply('You didnt write the data in given time');
                           ch.delete(10000)
                         })
                         embed.setAuthor(`Upload or provide an image link of the item`)
                         embed.setDescription(`Name: ${data[0]}\nDesc: ${data[1]}\nValue: ${data[2]}\nCategory: ${data[3]}\nEffect_value: ${data[4]}`);
                         await msgname.edit(embed)
                         await ch.awaitMessages(response => msg.content, { max: 1,
                           time: 180000, errors: ['time'] })
                         .then(async (collected) => {
                           async function t() {
                           if(collected.first().attachments.size < 1 ) {
                             var request = require('request');
                             var url = collected.first().content;
                             var magic = {
                                 jpg: 'ffd8ffe0',
                                 png: '89504e47',
                                 gif: '47494638',
                             };
                             var options = {
                                 method: 'GET',
                                 url: url,
                                 encoding: null // keeps the body as buffer
                             };

                             request(options, function (err, response, body) {
                                 if(!err && response.statusCode == 200){
                                     var magigNumberInBody = body.toString('hex',0,4);
                                     if (magigNumberInBody == magic.jpg ||
                                         magigNumberInBody == magic.png ||
                                         magigNumberInBody == magic.gif || collected.first().content.startsWith('http')) {

                                       let url = collected.first().content
                                       data.push(url)
                                   } else {
                                     msg.channel.send("invalid args");
                                     ch.delete()
                                     return;
                                   }
                               }
                             });
                           } else if(collected.first().attachments.size > 0){
                             console.log(collected.first())
                             let im = await msg.guild.members.get('694104913210245240').send("some text", {
                               file: collected.first().attachments.first().url // Or replace with FileOptions object
                             });
                             data.push(im.attachments.first().url)

                           } else {
                             msg.channel.send("invalid args");
                             ch.delete();
                             return;
                           }
                         }
                         await t();
                             })
                             .catch(function(){
                             msg.reply('You didnt write the data in given time');
                             ch.delete(10000)
                           })
                          setTimeout(continues, 1000)
                          function continues() {
                            let guild = msg.guild;
                            let name = Functions.clean(data[0]);
                            let desc = Functions.clean(data[1]);
                            let value = Functions.clean(data[2]);
                            let category = Functions.clean(data[3]);
                            let effect_value = Functions.clean(data[4]);
                            let image = data[5]
                            Dsql.Add_Item(guild, name, desc, value, category, effect_value, image);
                            let emmy = new Discord.RichEmbed()
                            emmy.setTitle(data[3].toUpperCase())
                            emmy.setDescription(`Name: ${data[0]}\nDesc: ${data[1]}\nValue: ${data[2]}\nCategory: ${data[3]}\nEffect_value: ${data[4]}`);
                            emmy.setColor("DEFAULT");
                            emmy.setThumbnail(image);
                            try {
                              msg.guild.channels.find(ch => ch.name == data[3].toLowerCase()).send(emmy)
                            } catch (err) {
                              return msg.channel.send('no shop channels made');
                            }

                            ch.delete()
                            return msg.channel.send("Item created.");
                          }
  }
}
module.exports = ITEM;
