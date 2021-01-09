const discord = require("discord.js")
const hastebin = require('hastebin')
const date = require('date-and-time')
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
  if(!message.guild) return message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This command can't be used in DMs"))
  if(!message.channel.name.startsWith("ticket-")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This is not a vaild ticket channel"))
  
  let reason = args.slice(0).join(" ")
  if(!reason) reason = "Unspecified"
  
  let logchannel = message.guild.channels.cache.find(ch => ch.name === "ticket-logs")
  
  let user = db.fetch(`ticket_${message.channel.id}`)
  if(user === null) user = "User not found"
  
  message.channel.messages.fetch()
  .then(messages => {
    let text = "";
  
  for (let [key, value] of messages) {
        const now = new Date();
      let dateString = `${date.format(now, 'YYYY/MM/DD HH:mm:ss', true)}`;

      text += `${dateString} | ${value.author.tag}: ${value.content}\n`;
  }
  
  hastebin.createPaste(text, {
          raw: true,
          contentType: 'text/plain',
          server: 'https://hastebin.com'
      })
    .then(data => {
    
    if(logchannel){
      const embed = new discord.MessageEmbed()
      .setColor(client.config.green)
      .setTitle("Ticket Closed")
      .addField("Information" , `User: ${message.author}\nTicket Channel: #${message.channel.name}\nReason: ${reason}\nTranscript: [Here](${data})`)
      
      logchannel.send(embed)
    }
    
  })
    
    message.channel.delete()
    
  })
}

module.exports.help = {
  name: "close",
  aliases: [],
  description: "Close a ticket a user has created",
  usage: " ",
  category: "support"
}