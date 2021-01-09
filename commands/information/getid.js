const discord = require("discord.js")

module.exports.run =  async (client, message, args) => {
  if(!message.guild) return message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This command can't be used in DMs"))
  let user = message.mentions.members.first() || message.member
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`${user.user.tag}`).setDescription(`${user.user.id}`).setFooter(`Requested by ${message.author.tag}`))
}

module.exports.help = {
  name: "getid",
  aliases: ["getuserid"],
  description: "Get someone's discord ID",
  usage: "(user)",
  category: "information"
}