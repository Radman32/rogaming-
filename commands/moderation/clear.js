const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  if(!message.guild) return message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This command can't be used in DMs"))
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`You need the 'Manage Messages' permission to use this command`))
  
  const amount = args.join(" ");
        if(!amount) return message.reply(new discord.MessageEmbed().setColor(client.config.red).setTitle(`You did not provid an amount of messages I must delete`))

        if(amount > 99) return message.reply(new discord.MessageEmbed().setColor(client.config.red).setTitle(`You cannot delete more than 99 messages`))

        if(amount < 1) return message.reply(new discord.MessageEmbed().setColor(client.config.red).setTitle(`You need to delete at least 1 message`))

message.delete().catch(err => console.log(err))


        await message.channel.messages.fetch({limit: amount})
        .then(messages => {
            message.channel.bulkDelete(messages)
            .catch(err => message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("An error has occured. If this error persists please contact a developer.\nError: " + err))
            .then(m => m.delete({timeout: 5000}))
            .catch(err => console.log(err))
            )
        }).catch(err => message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("An error has occured. If this persist please contact the developer\nError: " + err)))



    message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`Successfully deleted ${amount} messages`)).then(m => m.delete({timeout: 5000}))

}

module.exports.help = {
  name: "clear",
  aliases: ["purge"],
  description: "Purge a specific amount of messages between 1 to 100",
  usage: "<amount>",
  category: "Moderation"
}