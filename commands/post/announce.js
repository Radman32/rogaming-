
const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need the 'Manage Messages' permission to use this command"))
  let channel = message.mentions.channels.first()
  if(!channel) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You did not specify a channel"))
  
  if(!args.slice(1).join(" ")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You did not tell me what to say"))
  
  channel.send(args.slice(1).join(" ")).catch(err => { return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("I do not have permission to speak there"))})
  
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Announcement sent!"))
  
}

module.exports.help = {
  name: "announce",
  aliases: [],
  description: "Make the bot announce something",
  usage: "<channel> <text>",
  category: "post"
}