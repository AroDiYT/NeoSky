class F {
  clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)).replace(/'/g, "@quote" + String.fromCharCode(8203));
  else
      return text;
  } //yes
  new_embed() {
    let emmy = new D.RichEmbed();
    return emmy;
  }

   set(embed, fieldname, fieldvalue) {
       if(!embed, !fieldname, !fieldvalue)
        return console.log(`set('${fieldname.toLowerCase()}', '${fieldvalue}')`
        + " is invalid. (embed.js)");
       switch (fieldname.toLowerCase()) { // fix my indentation plz, im too used to TABS over spaces
         case "desc":
         case "description":
            embed.setDescription(fieldvalue);
            break;
         case "title": //Fuck, author requires an avatar url sometimes- so that is manual // yeah
            embed.setTitle(fieldvalue);
            break;
         case "imsofuckinggay":
            console.log('yeah man')
            break;
         case "image":
         case "img":
          embed.setImage(fieldvalue);
          break;
         case "thumb":
         case "thumbnail":
          embed.setThumbnail(fieldvalue);
          break;
         case "color":
          if(fieldvalue == null) //just to be sure-
            return embed.setColor("DEFAULT");
          embed.setColor(fieldvalue);
          break;
         case "footer":
          embed.setFooter(fieldvalue); // idk
          break;
         default:
          return console.log(`set('${fieldname.toLowerCase()}', '${fieldvalue}')`
          + " is invalid. (embed.js)");
       }
  }
   add(embed, title, value) {
    if(!embed, !title, !value)
     return console.log(`add('${title}', '${value}')`
     + " is invalid. (embed.js)");

     embed.addField(title, value);
     return; //Add try catches?
  }
}
module.exports = F;
