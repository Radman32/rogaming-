const { Client, Collection } = require("discord.js");
const discord = require("discord.js")
const { readdirSync } = require("fs");
const fs = require("fs");
const { sep } = require("path");
const { success, error, warning } = require("log-symbols");
const config = require("./config");
const bot = new Client();
let prefix = config.prefix
bot.config = config;

["commands", "aliases"].forEach(x => (bot[x] = new Collection()));

const load = (dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files =>
      files.endsWith(".js")
    );

    for (const file of commands) {
      const pull = require(`${dir}/${dirs}/${file}`);
      if (
        pull.help &&
        typeof pull.help.name === "string" &&
        typeof pull.help.category === "string"
      ) {
        if (bot.commands.get(pull.help.name))
          return console.warn(
            `${warning} Two or more commands have the same name ${pull.help.name}.`
          );
        bot.commands.set(pull.help.name, pull);
        console.log(`${success} Loaded command ${pull.help.name}.`);
      } else {
        console.log(
          `${error} Error loading command in ${dir}${dirs}. you have a missing help.name or help.name is not a string. or you have a missing help.category or help.category is not a string`
        );
        continue;
      }
      if (pull.help.aliases && typeof pull.help.aliases === "object") {
        pull.help.aliases.forEach(alias => {
          if (bot.aliases.get(alias))
            return console.warn(
              `${warning} Two commands or more commands have the same aliases ${alias}`
            );
          bot.aliases.set(alias, pull.help.name);
        });
      }
    }
  });
};

load();

bot.on("ready", () => {
  console.log("I am online");
  console.log(prefix)
});

bot.on("message", async message => {
  
  if(message.author.bot || !message.guild) return
  const db = require("quick.db")
  
   let wordx = db.fetch(`cuss_${message.guild.id}`)
  if(wordx){
    let array =[]
        wordx.forEach(m => {
          array.push(m.name)
      const blocked = array.filter(word => message.content.toLowerCase().includes(word));
      if (blocked.length > 0) {
      message.delete().catch(err => {console.log(err)})
      message.author.send(new discord.MessageEmbed().setColor(bot.config.red).setTitle("You are not allowed to say this word in the server"))
      }
  })
}
  
  if(!message.content.startsWith(prefix)) return
  const args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  let command;
  if(message.guild){
  if (!message.member)
    message.member = await message.guild.fetchMember(message.author);
  }

  if (!message.content.startsWith(prefix)) return;

  if (cmd.length === 0) return;
  if (bot.commands.has(cmd)) command = bot.commands.get(cmd);
  else if (bot.aliases.has(cmd))
    command = bot.commands.get(bot.aliases.get(cmd));
  
  if (command) command.run(bot, message, args);
  
})

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loaded Event: ${file}`);
    bot.on(eventName, event.bind(null, bot));
  });
});

bot.login(process.env.TOKEN).catch(console.error());