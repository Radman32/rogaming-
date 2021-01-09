const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
let channel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() === '│suggestions')
if(!channel) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Couldn't find a chnanel called 'suggestions'"))
  
  let sugg = args.slice(0).join(" ")
  if(!sugg) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You didn't tell me your suggestion"))
  
  let embed = new discord.MessageEmbed()
  .setColor(client.config.orange)
  .setTitle(`${message.author.tag}`)
  .setThumbnail(message.author.displayAvatarURL())
  .addField("**Suggestion**", sugg)
  .setTimestamp()
  
message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Suggestion Sent!"))

  channel.send(embed).catch(err => {return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("I do not have permission to talk in the suggestion channel, please DM a staff member to fix my permissions."))})
  .then(m => {
    m.react("✅")
    m.react("❌")
  })
  message.channel.send(new discord.MessageEmbed().setColor(client.config.blue).setTite("I have sent out your suggestion"))
}

module.exports.help = {
  name: "suggest",
  aliases: ["suggestion"],
  description: "Send a suggestion in the server",
  usage: "<suggestion>",
  category: "misc"
}