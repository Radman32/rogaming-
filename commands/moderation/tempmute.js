const discord = require("discord.js")
const ms = require("ms")
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
    let muterole = message.guild.roles.cache.find(rl => rl.name.toLowerCase() === "muted")
    if(!muterole) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`I couldn't find a role called Muted`))
  
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need the 'Manage Roles' permission to use this command"))
  if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("I need the 'Manage Roles' permission to use this command"))
  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!user) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need to specify a user to mute"))
  if(user.id === message.author.id) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot mute your self"))
  if(user.hasPermission("MANAGE_ROLES")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot mute a staff member"))
  if(user.roles.cache.has(muterole.id)) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This user is already muted"))

  let time = args[1]  
  
    if(!isNaN(time)) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("The time must be a number"))

  
  if(!time.endsWith("s") && !time.endsWith("h") && !time.endsWith("d"))return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Please specify the time\nS for seconds | H for hours | D for days"))
  
  
  if(ms(time)){
  let reason = args.slice(2).join(" ")
  if(!reason) reason = "Unspecified"

    db.add(`infraction_${message.guild.id}_${message.author.id}`, 1)
  
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`${user.user.tag} has been muted for ${time}\nReason: ${reason}`))
  user.roles.add(muterole)
    
  setTimeout(() => {
    user.roles.remove(muterole)
  }, ms(time))
  
    message.delete()
  }
}

module.exports.help = {
  name: "tempmute",
  aliases: [],
  description: "Tempmute a specific user in the server",
  usage: "<@user | ID> <time s | m | d> (reason)",
  category: "Moderation"
}