const discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
  let database = db.get(`cuss_${message.guild.id}`)
 
  if(database === null) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("No blacklisted words set in this server yet"))
  
      if(database ) {
        let array =[]
        database.forEach(m => {
          array.push(m.name)
        })
        
        let embed = new discord.MessageEmbed()
        .setColor(client.config.green)
        .setTitle("Blacklisted words")
        .setDescription(array.join(",\n"))
        .setFooter("See nothing? Means this server has no blacklisted words")
        message.channel.send(embed)
      }
}

module.exports.help = {
  name:"blacklists",
  aliases: ["cusswords", "blacklistedwords", "blacklistedword", "cussword"],
  description: "Check the servers blacklisted words",
  usage: " ",
  category: "filter"
}