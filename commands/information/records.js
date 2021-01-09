const discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
  let user = message.mentions.members.first()
    if(!user) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot to specify a user"))
  let description = db.fetch(`description_${message.guild.id}_${user.id}`)
  if(description === null) description = 'No description set for this user'
  
  let infractions = db.fetch(`infractions_${message.guild.id}_${user.id}`)
  if(infractions === null) infractions = 0
  
  const embed = new discord.MessageEmbed()
  .setColor(client.config.green)
  .setTitle(`${user.user.tag}`, user.user.displayAvatarURL())
  .setThumbnail(user.user.displayAvatarURL())
  .setDescription(description)
  .addField("Infractions", infractions)
  
  message.channel.send(embed)
}

module.exports.help = {
  name: "records",
  aliases: ["record"],
  description: "Checks a users record",
  usage: "<user>",
  category: "Information"
}