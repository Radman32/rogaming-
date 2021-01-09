const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.guild) return message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This command can't be used in DMs"))
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need the 'Administrator' permission to use this command"))
  let user = message.mentions.members.first()
  if(!user) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot to mention a user"))
  
  let description = args.slice(1).join(" ")
  if(!description) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot to describe the user"))
  
  db.set(`description_${message.guild.id}_${user.id}`, description)
  
  
  
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).addField("**Successful**", "I have successfully set " + `${user}` + "'s description as "  + ` \`${description}\``))
}

module.exports.help = {
  name: "describe",
  aliases: [],
  description: "Describe someone in the server",
  usage: "<user> <his description>",
  category: "Moderation"
}