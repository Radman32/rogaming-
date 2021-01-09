module.exports = async bot => {
  await console.log(
    `____________________\nClient: ${bot.user.tag}\nClient ID: ${bot.user.id}\nGuild Count: ${bot.guilds.cache.size}\nUser Count: ${bot.users.cache.size}\n____________________`
  );
  let activities = [
      `.help`,
    ],
    i = 0;
  setInterval(() => {
    bot.user.setActivity(`${activities[i++ % activities.length]}`, {
      type: "WATCHING"
    });
  }, 20000);
  bot.user.setPresence({
    status: "online"
  });
};