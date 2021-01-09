const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.guild) return message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This command can't be used in DMs"))
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need `ADMINISTRATOR` perms to use this command"))
let prefix = db.fetch(`prefix_${message.guild.id}`)
if(prefix === null) prefix = client.config.prefix
    let cmdname = args[0]

    if(!cmdname) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`You did not tell me the word to blacklisted\n Usage: ${prefix}blacklist <word> `))

    let database = db.get(`cuss_${message.guild.id}`)

    if(database && database.find(x => x.name === cmdname.toLowerCase())) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This is already a blacklisted word"))

    let data = {
      name: cmdname.toLowerCase(),
    }

    db.push(`cuss_${message.guild.id}`, data)

    return message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Added **" + cmdname.toLowerCase() + "** as a blacklisted word in the server."))
}

module.exports.help = {
  name: "blacklist",
  aliases: ["addcuss"],
  description: "Add a blacklisted word for your server",
  usage: "<word>",
  category: "filter"
}