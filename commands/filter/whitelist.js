const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.guild) return message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This command can't be used in DMs"))
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor("RED").setTitle("You need the 'ADMINISTRATOR' permissions to use this command"))
  
  let prefix = db.fetch(`prefix_${message.guild.id}`)
if(prefix === null) prefix = client.config.prefix

  let cmdname = args[0]

    if(!cmdname) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`You did not specify the word\nUsage: ${prefix}whitelist <word>`))

    let database = db.get(`cuss_${message.guild.id}`)

    if(database) {
      let data = database.find(x => x.name === cmdname.toLowerCase())

      if(!data) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("I was not able to delete this blacklisted word, since its not a valid word"))

      let value = database.indexOf(data)
      delete database[value]

      var filter = database.filter(x => {
        return x != null
      })

      db.set(`cuss_${message.guild.id}`, filter)
      return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`Deleted the **${cmdname}** word!`))


    } else {
      return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTtle("There was an error deleting the blacklisted word, if this keeps on occuring please contact the developer"))
  }
}

module.exports.help = {
  name: "whitelist",
  aliases: ["remcuss"],
  description: "Remove a blacklisted in this server",
  usage: "<word>",
  category: "filter"
}