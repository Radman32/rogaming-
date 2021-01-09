const discord = require("discord.js");
const fs = require("fs");
const randostrings = require("randostrings");
const random = new randostrings();
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.guild) return message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This command can't be used in DMs"))
let category = message.guild.channels.cache.find(c => c.name == "Tickets" && c.type == "category");
  if(!category) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Please contact a staff member to create a category called 'Tickets'"))
  
  let role = message.guild.roles.cache.find(rl => rl.name === "Support Team")
  if(!role) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Please contact a staff member to create a role called 'Support Team'"))
  
  let everyone = message.guild.roles.everyone;
  if(!everyone) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Error"))
  
  let reason = args.slice(0).join(" ");
  if (!reason) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You did not specify a reason."));

  let number = random.numberGenerator({
    min: 11111,
    max: 99999
  });

  let name = `ticket-${number}`;
  message.guild.channels.create(name, { type: "text" }).then(chan => {
    chan.updateOverwrite(message.author, { 
      VIEW_CHANNEL: true, 
      READ_MESSAGES: true, 
      SEND_MESSAGES: true, 
      READ_MESSAGE_HISTORY: true, 
      ATTACH_FILES: true 
    });
    chan.updateOverwrite(role, { 
      VIEW_CHANNEL: true, 
      READ_MESSAGES: true, 
      SEND_MESSAGES: true, 
      READ_MESSAGE_HISTORY: true, 
      ATTACH_FILES: true 
    });
    chan.updateOverwrite(everyone, { 
      VIEW_CHANNEL: false 
    });
    
    chan.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("New Ticket").setDescription(`${message.author} requested a ticket. Please wait for one of our staff members to assist you, during your wait time you can review #faq.`).addField("Information", `User: ${message.author.tag} (${message.author.id})\nReason: ${reason}\nTicket: #${chan.name}`))
    
    chan.setParent(category.id)
    
    chan.setTopic(`Ticket opened by ${message.author.tag} (${message.author.id}`)
    
    message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Ticket Created").setDescription(`Ticket: ${chan}`))
    
    db.set(`ticket_${chan.id}`, message.author)
  });
};
module.exports.help = {
  name: "create",
  aliases: [],
  description: "Create a ticket in the server",
  usage: " ",
  category: "support"
};
