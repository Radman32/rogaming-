const discord = require("discord.js")
module.exports.run = async (client, message, args) => {
  if(!message.guild) return message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This command can't be used in DMs"))
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need the 'Ban Members' to be able to use this command"))
  
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("I need the 'Ban Members' permission to use this command."))
  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!user) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need to specify a user to ban"))
  if(user.id === message.author.id) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot ban your self"))
  if(user.hasPermission("BAN_MEMBERS")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot ban a staff member"))

message.delete().catch(err => console.log(err))

  
  let reason = args.slice(1).join(" ")
  if(!reason) reason = "Unspecified"
  

  
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`Successfully banned ${user.user.tag}\nReason: ${reason}`))
  user.ban({days: 7, reason: reason})
  



}

module.exports.help = {
  name: "ban",
  aliases: [],
  description: "Ban a user from a specific server",
  usage: "<@User | ID> (reason)",
  category: "Moderation"
}