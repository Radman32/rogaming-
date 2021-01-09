const discord = require("discord.js");
const { readdirSync } = require("fs");

module.exports.run = (bot, message, args) => {
  if(!message.guild) return message.author.send(new discord.MessageEmbed().setColor(bot.config.red).setTitle("This command can't be used in DMs"))
  let prefix = bot.config.prefix
  const embed = new discord.MessageEmbed()
    .setColor(bot.config.blue)
    .setAuthor(`Help command`, bot.user.displayAvatarURL())
    /*.setFooter(
      `Requested by ${message.author.tag} at`,
      message.author.displayAvatarURL
    )*/
  .setFooter(`Requested by ${message.author.tag}`)
    //.setTimestamp();
  
  if (args[0]) {
    let command = args[0];
    let cmd;
    if (bot.commands.has(command)) {
      cmd = bot.commands.get(command);
    } else if (bot.aliases.has(command)) {
      cmd = bot.commands.get(bot.aliases.get(command));
    }
    if (!cmd)
      return message.channel.send(
        embed
          .setColor(bot.config.red)
          .setTitle("Invalid Command.")
          .setDescription(
            `Do \`${prefix}help\` for the list of the commands.`
          )
      );
    command = cmd.help;
    embed.setTitle(
      `${command.name.slice(0, 1).toUpperCase() +
        command.name.slice(1)} command help`
    );
    embed.setDescription(
      [
        "**<>** is needed, **()** is optional\n",
        `**Command:** ${command.name.slice(0, 1).toUpperCase() +
          command.name.slice(1)}`,
        `**Description:** ${command.description ||
          "No Description provided."}`,
        `**Usage:** ${command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : "No Usage"
        } `,
        `**Aliases:** ${
          command.aliases ? command.aliases.join(", ") : "None"
        }`,
        `**Category:** ${
          command.category ? command.category : "General" || "Misc"
        }`,
      ].join("\n")
    );

    return message.channel.send(embed);
  }
  const categories = readdirSync("./commands/");
 /* embed.setDescription(
    [
      `To get more information use ${prefix}help (command name)`,
    ].join("\n")
  );*/
 /* let database = db.get(`cmd_${message.guild.id}`)
  if(database && database.length) {
        let array =[]
        database.forEach(m => {
          array.push(m.name)
        })
        embed.addField("Custom Commands", array.join(", "))
        //message.channel.send(embed)
      }*/
  categories.forEach(category => {
    const dir = bot.commands.filter(
      c => c.help.category.toLowerCase() === category.toLowerCase()
    );

    const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);

    try {      
      if (dir.size === 0) return;
      if (bot.config.owners.includes(message.author.id))
        embed.addField(
         `${capitalise}`,
          dir.map(c => `\`${c.help.name}\``).join("\n")
        );
      
      else if (category !== "developer")
        embed.addField(
           `${capitalise}`,
          dir.map(c => `\`${c.help.name}\``).join("\n")
        );
    } catch (e) {
      console.log(e);
    }
          /*let database = db.get(`cmd_${message.guild.id}`)
  if(database && database.length) {
        let array =[]
        database.forEach(m => {
          array.push(m.name)
        })
        embed.addField("❯ Custom Commands", array.join(", "))
      }*/

  });
  return message.channel.send(embed);
};


module.exports.help = {
  name: "help",
  aliases: [],
  description: "Help command to show the commands",
  usage: "(command name)",
  category: "information"
};