module.exports = {
  name: "emote",
  desc: "The Emote Module",

  aliases: null,

  cat: "fun",

  subs: ['hug','kiss','pat','baka','slap','poke','meow','feed','cuddle','woof'],
  subsinfo: ['Hug you friends!','Kiss your loved **ones**','Pat evewyone!',
  'Ba-baka-nee!','Slap the baddies!','Poke people to get attention!','Get cute kitties!','Give food to people!','Cuddle with fwends or- or people y-you like!','Cute doggo\'s'],


  async exec(msg, args) {
    let embed = new Discord.RichEmbed()
    switch (args[0].toLowerCase()) {
      case "hug":
          if(msg.mentions.users.first()) {
            embed.setDescription(`${msg.author}\n**hugs**\n ${msg.mentions.users.array().join(', ')}`);
            embed.setColor('RANDOM');
            let hug = await neko.sfw.hug();
            embed.setImage(hug.url)
            msg.channel.send(embed)
          } else {
            let t = await msg.channel.send("O-oh.. y-you have n-none to hug?");
            let rng = Math.floor(Math.random()*10);
            if(rng == 7) {
              embed.setDescription(`${client.user} **kisses** ${msg.author}`);
              embed.setColor('AQUA');
              let kisshugg = await neko.sfw.kiss();
              embed.setImage(kisshug.url);
              setTimeout(next, 900);
              function next() {
                t.edit("I-if you tell anyone.. you are dead!", {embed});
              }
            } else {
              embed.setDescription(`${client.user} **Hugs** ${msg.author}`);
              embed.setColor('AQUA');
              let hug = await neko.sfw.hug();
              embed.setImage(hug.url);
              setTimeout(next, 900);
              function next() {
                t.edit("Here.... a hug... baka!", {embed});
              }
            }
          }
         break;
      case "kiss":
            if(msg.mentions.users.first()) {
            embed.setDescription(`${msg.author}\n**kisses**\n ${msg.mentions.users.array().join(', ')}`);
            embed.setColor('RANDOM');
            let kiss = await neko.sfw.kiss();
            embed.setImage(kiss.url)
            msg.channel.send(embed)
          } else {
            let t = await msg.channel.send("O-oh.. y-you have n-none to kiss?");
            let rng = Math.floor(Math.random()*10);
            if(rng == 7) {
              embed.setDescription(`${client.user} **kisses** ${msg.author}`);
              embed.setColor('AQUA');
              let kisskiss = await neko.sfw.kiss();
              embed.setImage(kisskiss.url);
              setTimeout(next, 900);
              function next() {
                t.edit("I-if you tell anyone.. you are dead!", {embed});
              }
            } else {
              embed.setDescription(`${client.user} **Hugs** ${msg.author}`);
              embed.setColor('AQUA');
              let hugkiss = await neko.sfw.hug();
              embed.setImage(hugkiss.url);
              setTimeout(next, 900);
              function next() {
                t.edit("Here.... a hug... baka.. d-don't think i'll kiss you!", {embed});
              }
            }
          }
         break;
      case "pat":
          if(msg.mentions.users.first()) {
          embed.setDescription(`${msg.author}\n**pats**\n ${msg.mentions.users.array().join(', ')}`);
          embed.setColor('RANDOM');
          let pat = await neko.sfw.pat();
          embed.setImage(pat.url)
          msg.channel.send(embed)
          } else {
          let t = await msg.channel.send("O-oh.. y-you have n-none to pat??");
            embed.setDescription(`${client.user} **steals pats from** ${msg.author}`);
            embed.setColor('AQUA');
            let patpat = await neko.sfw.pat();
            embed.setImage(patpat.url);
            setTimeout(next, 900);
            function next() {
              t.edit("GIMME THE PATS", {embed});
            }
          }
        break;
      case "baka":
          embed.setDescription(`B-baka!`);
          embed.setColor('RANDOM');
          let baka = await neko.sfw.baka();
          embed.setImage(baka.url)
          msg.channel.send(embed)
        break;
      case "slap":
          if(msg.mentions.users.first() && !(msg.mentions.users.first().id == "694104913210245240")) {
          embed.setDescription(`${msg.author}\n**slaps**\n ${msg.mentions.users.array().join(', ')}`);
          embed.setColor('RANDOM');
          let slap = await neko.sfw.slap();
          embed.setImage(slap.url)
          msg.channel.send(embed)
          } else if(msg.mentions.users.first()){
          let t = await msg.channel.send("O-oh.. y-you wanted slap master Dawio!");
            embed.setDescription(`${client.user} **slaps** ${msg.author}`);
            embed.setColor('AQUA');
            let slapdaw = await neko.sfw.slap();
            embed.setImage(slapdaw.url);
            setTimeout(next, 900);
            function next() {
              t.edit("BAKA", {embed});
            }
          } else {
            msg.channel.send("W-why would you want to use th-this command..")
          }
        break;
      case "meow":
          embed.setDescription(`Meow~`);
          embed.setColor('RANDOM');
          let meow = await neko.sfw.meow();
          embed.setImage(meow.url)
          msg.channel.send(embed)
        break;
      case "poke":
          if(msg.mentions.users.first()) {
          embed.setDescription(`${msg.author}\n**pokes**\n ${msg.mentions.users.array().join(', ')}`);
          embed.setColor('RANDOM');
          let poke = await neko.sfw.poke();
          embed.setImage(poke.url)
          msg.channel.send(embed)
          } else {
          let t = await msg.channel.send("O-oh..");
            embed.setDescription(`${client.user} **pokes** ${msg.author}`);
            embed.setColor('AQUA');
            let poky = await neko.sfw.poke();
            embed.setImage(poky.url);
            setTimeout(next, 900);
            function next() {
              t.edit("I-i want a-attentions.. p-please..", {embed});
            }
          }
        break;
      case "feed":
          if(msg.mentions.users.first()) {
          embed.setDescription(`${msg.author}\n**feeds**\n ${msg.mentions.users.array().join(', ')}`);
          embed.setColor('RANDOM');
          let feed = await neko.sfw.feed();
          embed.setImage(poke.url)
          msg.channel.send(embed)
          } else {
          let t = await msg.channel.send("O-oh..");
            embed.setDescription(`${client.user} **steals spoon with food** ${msg.author}`);
            embed.setColor('AQUA');
            let ffeed = await neko.sfw.feed();
            embed.setImage(ffeed.url);
            setTimeout(next, 900);
            function next() {
              t.edit("Me hungwy!", {embed});
            }
          }
        break;
      case "cuddle":
          if(msg.mentions.users.first()) {
            embed.setDescription(`${msg.author}\n**cuddles**\n ${msg.mentions.users.array().join(', ')}`);
            embed.setColor('RANDOM');
            let cuddles = await neko.sfw.cuddle();
            embed.setImage(cuddles.url)
            msg.channel.send(embed)
          } else {
            let t = await msg.channel.send("O-oh.. y-you have n-none to c-cuddle with?");
            let rng = Math.floor(Math.random()*10);
            if(rng == 7) {
              embed.setDescription(`${client.user} **cuddles** ${msg.author}`);
              embed.setColor('AQUA');
              let cuddly = await neko.sfw.cuddle();
              embed.setImage(cuddly.url);
              setTimeout(next, 900);
              function next() {
                t.edit("I-if you tell anyone.... i-i'll be mad!", {embed});
              }
            } else {
              embed.setDescription(`${client.user} **Hugs** ${msg.author}`);
              embed.setColor('AQUA');
              let hugc = await neko.sfw.hug();
              embed.setImage(hugc.url);
              setTimeout(next, 900);
              function next() {
                t.edit("Here.... a hug... baka!", {embed});
              }
            }
          }
         break;
       case "woof":
           embed.setDescription(`Woof~`);
           embed.setColor('RANDOM');
           let cc = await neko.sfw.woof();
           embed.setImage(cc.url)
           msg.channel.send(embed)
         break;
      default:
       return msg.channel.send("That is not an emote of this module.");
    }


  }

}
