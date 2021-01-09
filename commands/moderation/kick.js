const discord = require("discord.js")
module.exports.run = async (client, message, args) => {
  if(!message.guild) return message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This command can't be used in DMs"))
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need the 'Kick Members' to be able to use this command"))
  
  if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("I need the 'Kick Members' permission to use this command"))
  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!user) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need to specify a user to kick"))
  if(user.id === message.author.id) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot kick your self"))
  if(user.hasPermission("KICK_MEMBERS")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot kick a staff member"))

  
  let reason = args.slice(1).join(" ")
  if(!reason) reason = "Unspecified"
  
  message.delete().catch(err => console.log(err))

  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`Successfully kicked ${user.user.tag}\nReason: ${reason}`))
  user.kick({reason: reason})


}

module.exports.help = {
  name: "kick",
  aliases: [],
  description: "Kick a user from a specific server",
  usage: "<@User | ID> (reason)",
  category: "Moderation"
}