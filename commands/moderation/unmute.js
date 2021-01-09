const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.guild) return message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This command can't be used in DMs"))
  let muterole = message.guild.roles.cache.find(rl => rl.name.toLowerCase() === "muted")
  if(!muterole) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`I couldn't find a role called Muted.`))
  
  
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need the 'Manage Roles' permission to use this command"))
  
  if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("I need the 'Manage Roles' permission to use this command"))
  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!user) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need to specify a user to unmute"))
  if(user.id === message.author.id) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot unmute your self"))
  if(!user.roles.cache.has(muterole.id)) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This user is not muted"))

//message.delete()

  
  let reason = args.slice(1).join(" ")
  if(!reason) reason = "Unspecified"
  
    db.add(`infraction_${message.guild.id}_${message.author.id}`, 1)
  
  message.delete().catch(err => console.log(err))
  
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`${user.user.tag} has been  unmuted\nReason: ${reason}`))
  
  user.roles.remove(muterole)
}

module.exports.help = {
  name: "unmute",
  aliases: [],
  description: "Unmute a user from the server",
  usage: "<@user | ID> (reason)",
  category: "Moderation"
}