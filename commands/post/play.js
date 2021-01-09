const discord = require("discord.js")
const rbx = require("noblox.js")

module.exports.run = async (client, message, args) => {
  let ids = {
    staffGuild: "", //Type: number {number: staffGuildID}
    normalGuild: "744222262202204181", //Type: number {number: normalGuildID}
    staffChannel: "772504184158289952", //Type: number {number: staffChannelID}
  }
  
 /*let channels = {
    adoptme: "│adopt-me", //Type: string {string: channelName}
    bloxburg: "│bloxburg", //Type: string {string: channelName}
    royalhigh: "│royal-high", //Type: string {string: channelName}
    brookhavenrp: "│brookhaven-rp", //Type: string {string: channelName}
    murdermystery: "│murder-mystery", //Type: string {string: channelName}
    bubblegumsimulator: "│bubble-gum-simulator", //Type: string {string: channelName}
    shindolife: "│shindo-life", //Type: string {string: channelName}
    arsenal: "│arsenal", //Type: string {string: channelName}
    phantomforces: "│phantom-forces", //Type: string {string: channelName}
    piggy: "│piggy", //Type: string {string: channelName}
    beeswarmsimulator: "│beeswarm-simulator", //Type: string {string: channelName}
    towerofhell: "│tower-of-hell", //Type: string {string: channelName}
    islands: "│islands", //Type: string {string: channelName}
    impostor: "│impostor", //Type: string {string: channelName}
    babft: "│babft" //Type: string {string: channelName}
  }*/
  
  let thumbnail = {
    adoptme: "https://t2.rbxcdn.com/ad5f3bf0085602bf2c0a2e3573f40556", //Type: string {string: gameLink}
    bloxburg: "https://t0.rbxcdn.com/f3366d7fd4ee2c50b20c4f119fb21a06", //Type: string {string: gameLink}
    royalhigh: "https://t6.rbxcdn.com/87972a5c14771a3a212bf189c9f96141", //Type: string {string: gameLink}
    brookhavenrp: "https://t1.rbxcdn.com/955b2a77e3c21c40a588a69ac4bf6c6d", //Type: string {string: gameLink}
    murdermystery: "https://t5.rbxcdn.com/1c504e92e0097725bf74e6776f72ec1b", //Type: string {string: gameLink}
    bubblegumsimulator: "https://t7.rbxcdn.com/6f6b72ac810190fe9181cfe40d7705e0", //Type: string {string: gameLink}
    shindolife: "https://t4.rbxcdn.com/3f007fcff45cf11ba384539852d09dc6", //Type: string {string: gameLink}
    arsenal: "https://t3.rbxcdn.com/0c54dbec73e364e5a2a3e2f401aa7da9", //Type: string {string: gameLink}
    phantomforces: "https://t3.rbxcdn.com/82dc36973c8965a1f7cb6d8b805cba49", //Type: string {string: gameLink}
    piggy: "https://t7.rbxcdn.com/ef0b79526578e5befc1c65f8be84e9a7", //Type: string {string: gameLink}
    beeswarmsimulator: "https://t4.rbxcdn.com/a6b4a3535528da36905a7017b6a6ff74", //Type: string {string: gameLink}
    towerofhell: "https://t0.rbxcdn.com/462af30fc5aafcbfa5e77a28022c38a9", //Type: string {string: gameLink}
    islands: "https://t4.rbxcdn.com/ee4682bc35101065abc43a1db577a07e", //Type: string {string: gameLink}
    impostor: "https://t4.rbxcdn.com/ab4d9ab2c17b7d02a9d53fc0a3054ae6", //Type: string {string: gameLink}
    babft: "https://t3.rbxcdn.com/dad04293308b13826d7b17ff59c2df4b", //Type: string {string: gameLink}
  }
  
  let gameChoices = ["adopt-me", "bloxburg", "royal-high", "brookhaven-rp", "murder-mystery", "bubble-gum-simulator", "shindo-life", "arsenal", "phantom-forces", "piggy", "beeswarm-simulator", "tower-of-hell", "islands", "impostor", "babft"] //Type: object [object: Array] {Array: gameNames} && "Spaces are not allowed" 
  
  /*if(message.guild.id !== ids.normalGuild) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This command cannot be run in this server"))*/
  
  const filter = m => m.author.id === message.author.id
  
  if(message.guild){
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Check your DMs"))
  }
  message.author.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("PLAYING ROBLOX").setDescription("You're moments away from playing with other Gamers among the RoGaming community!").addField("**What will you be playing?**", "Please refer to the Game Category in the main server for our game choices.\n> **NOTE:** Be sure to change spaces to a `-`\n\nUse `cancel` to end this thread, you have 5 minutes to answer this question."))
  .then(() => { 
    message.author.dmChannel.awaitMessages(filter, {max: 1, time: 300000, errors:["time"]})
    .then(game => {
    if(game.first().content.toLowerCase() === "cancel"){
      return message.author.send(new discord.MessageEmbed().setColor(client.config.orange).setTitle("Prompt Cancelled"))
    }
    if(!gameChoices.includes(game.first().content.toLowerCase())){
      return message.author.send(new discord.MessageEmbed().setColor(client.config.red).addField("Input Error", "The game you chose is not a valid option").setFooter("This prompt was cancelled"))
    }
     message.author.send(new discord.MessageEmbed().setColor(client.config.green).addField("**Information**", "> Please type below all the information / description regarding this play session.\n\nUse `cancel` to end this thread, you have 5 minutes to answer this question."))
    .then(() => {
       message.author.dmChannel.awaitMessages(filter, {max: 1, time: 300000, errors:["time"]})
       .then(description => {
         if(description.first().content.toLowerCase() === "cancel"){
           return message.author.send(new discord.MessageEmbed().setColor(client.config.orange).setTitle("Prompt Cancelled"))
         }
         message.author.send(new discord.MessageEmbed().setColor(client.config.green).addField("**Time of Play**", "Please give us a valid format HH:MM for when you will be starting your play session\n> **NOTE:** Time uses 24-Hour Time. Example 22:33. **Cannot exceed 23:59**\n\nUse `cancel` to end this thread, you have 5 minutes to answer this question."))
         .then(() => {
       message.author.dmChannel.awaitMessages(filter, {max: 1, time: 300000, errors:["time"]})
           .then(time => {
         var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time.first().content);
         
         if(time.first().content.toLowerCase() === "cancel"){
           return message.author.send(new discord.MessageEmbed().setColor(client.config.orange).setTitle("Prompt Cancelled"))
         }
         
         if(!isValid){
           return message.author.send(new discord.MessageEmbed().setColor(client.config.red).addField("Input Error.","Your response was invalid please send a valid HH:MM format for your response").setFooter("This prompt was cancelled"))
         }
         
         message.author.send(new discord.MessageEmbed().setColor(client.config.green).addField("**Reward**" , "How much robux will you be distributing to attendees?\n> Please use `0` if this is a voluntary play session to attend\n\nUse `cancel` to end this thread, you have 5 minutes to answer this question."))
         .then(() => {
       message.author.dmChannel.awaitMessages(filter, {max: 1, time: 300000, errors:["time"]})
           .then(reward => {
         if(reward.first().content.toLowerCase() === "cancel"){
           return message.author.send(new discord.MessageEmbed().setColor(client.config.orange).setTitle("Prompt Cancelled"))
         }
         if(isNaN(reward.first().content)) {
           return message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Input error", "The reward given must be a number").setFooter("This prompt was cancelled"))
         }
         
         message.author.send(new discord.MessageEmbed().setColor(client.config.green).addField("**What is your roblox username**", "Please tell us your roblox username\n> Example: Aesth_tix, FlewbyaGaming_YT\n\nUse `cancel` to end this thread, you have 5 minutes to answer this question."))
         .then(() => {
       message.author.dmChannel.awaitMessages(filter, {max: 1, time: 300000, errors:["time"]})
           .then(async roblox => {
         
         if(roblox.first().content.toLowerCase() === "cancel"){
           return message.author.send(new discord.MessageEmbed().setColor(client.config.orange).setTitle("Prompt Cancelled"))
         }
         
         await rbx.getIdFromUsername(roblox.first().content)
           .then(id => {
           message.author.send(new discord.MessageEmbed().setColor(client.config.green).addField("Sending...", "Are you sure you would like to send the prompt? Please reply with `yes` if not reply with something else.\n\nTrolling in the prompt will get you punished"))
         })
         .catch(e => {
           return message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Input Error", "The roblox username given is not valid").setFooter("This prompt was cancelled"))  
         })
         .then(() => {
       message.author.dmChannel.awaitMessages(filter, {max: 1, time: 300000, errors:["time"]})
        .then(async sure => {
         if(sure.first().content.toLowerCase() !== "yes"){
           return message.author.send(new discord.MessageEmbed().setColor(client.confid.orange).setTitle("Prompt Cancelled"))
         }
         if(sure.first().content.toLowerCase() === "yes"){
           message.author.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Prompt Successfully sent"))
         }
         let games;
         let channel;
         let amount;
         let image;
         if(reward.first().content === 0 || reward.first().content < 1) amount = "Voluntary"
         if(reward.first().content > 1) amount = reward.first().content + " robux"
         
         let choice = game.first().content.toLowerCase()
         
         let guild = client.guilds.cache.get(ids.normalGuild)
         
         if(choice === "adopt-me"){
           games = "Adopt me"
           channel = guild.channels.cache.find(ch => ch.name === "│adopt-me")
           image = thumbnail.adoptme
         }
         if(choice === "bloxburg"){
           games = "Bloxburg"
           channel = guild.channels.cache.find(ch => ch.name === "│bloxburg")
           image = thumbnail.bloxburg
         }
         if(choice === "royal-high"){
           games = "Royal high"
           channel = guild.channels.cache.find(ch => ch.name === "│royalhigh")
           image = thumbnail.royalhigh
         }
         if(choice === "brookhaven-rp"){
           games = "Brookhaven rp"
           channel = guild.channels.cache.find(ch => ch.name === "│brookhaven-rp")
           image = thumbnail.brookhavenrp
         }
         if(choice === "murder-mystery"){
           games = "Murder mystery"
           channel = guild.channels.cache.find(ch => ch.name === "│murder-mystery")
           image = thumbnail.murdermystery
         }
         if(choice === "bubble-gum-simulator"){
           games = "Bubble gum simulator"
           channel = guild.channels.cache.find(ch => ch.name === "│bubble-gum-simulator")
           image = thumbnail.bubblegumsimulator
         }
         if(choice === "shindo-life"){
           games = "Shindo life"
           channel = guild.channels.cache.find(ch => ch.name === "│shindo-life")
           image = thumbnail.shindolife
         }
         if(choice === "arsenal"){
           games = "Arsenal"
           channel = guild.channels.cache.find(ch => ch.name === "│arsenal")
           image = thumbnail.arsenal
         }
         if(choice === "phantom-forces"){
           games = "Phantom forces"
           channel = guild.channels.cache.find(ch => ch.name === "│phantom-forces")
           image = thumbnail.phantomforces
         }
         if(choice === "piggy"){
           games = "Piggy"
           channel = guild.channels.cache.find(ch => ch.name === "│piggy")
           image = thumbnail.piggy
         }
         if(choice === "beeswarm-simulator"){
           games = "Beeswarm simulator"
           channel = guild.channels.cache.find(ch => ch.name === "│beeswarm-simulator")
           image = thumbnail.beeswarmsimulator
         }
         if(choice === "tower-of-hell"){
           games = "Tower of hell"
           channel = guild.channels.cache.find(ch => ch.name === "│tower-of-hell")
           image = thumbnail.towerofhell
         }
         if(choice === "islands"){
           games = "Islands"
           channel = guild.channels.cache.find(ch => ch.name === "│islands")
           image = thumbnail.islands
         }
         if(choice === "impostor"){
           games = "Impostor"
           channel = guild.channels.cache.find(ch => ch.name === "│impostor")
           image = thumbnail.impostor
         }
         if(choice === "babft"){
           games = "Babft"
           channel = guild.channels.cache.find(ch => ch.name === "│babft")
           image = thumbnail.babft
         }
         
         let rbxId = await rbx.getIdFromUsername(roblox.first().content)
         let rbxName = await rbx.getUsernameFromId(rbxId)
         
         const finished = new discord.MessageEmbed()
         .setColor(client.config.green)
         .setTitle("**PLAYING ROBLOX**")
         .setDescription(`${description.first().content}`)
         .addField("Game", games)
         .addField("Time", time.first().content + " UTC")
         .addField("Reward" , amount)
         .addField("Contacts", `Roblox: [${rbxName}](https://www.roblox.com/users/${rbxId}/profile)\nDiscord: ${message.author}`)
         .setImage(image)
         
         let staffChannel = client.channels.cache.get(ids.staffChannel)
         if(!staffChannel) return message.author.send(new discord.MessageEmbed().setCoor(client.config.red).addField("**Unexpected Error**", "I was not able to send this for approval, the staffChannel is missing. Please DM a staff member"))
         
        let msg = await staffChannel.send(finished)
        msg.react("✅")
        msg.react("❎")
         
        const rfilter = (reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❎')
        
         msg.awaitReactions(rfilter, {max: 1})
         .then(answer => {
           if(answer.first().emoji.name === "✅"){
             if(!channel){
               msg.delete({timeout: 30000})
               message.author.send(new discord.MessageEmbed().setColor(client.configred).setTitle("**Channel Game Not Found**", "It seems like after getting approved the game (**" + games + "**) you chose does not have a valid channel. Please contact a staff member to add the channel and try again."))
               return staffChannel.send(new discord.MessageEmbed().setColor(client.config.red).addField("**Channel not found**", `The channel for the game **${games}** was not found`))
             }
             channel.send(finished)
             msg.delete()
             message.author.send(new discord.MessageEmbed().setColor(client.config.green).addField("**Prompt Accepted**", "Your prompt request has been sent to it's valid channel."))
           }
           
           if(answer.first().emoji.name === "❎"){
             message.author.send(new discord.MessageEmbed().setColor(client.config.red).addField("**Prompt Declined**", "Your prompt request has been declined."))
             msg.delete()
           }
         })
         
         
         
       }).catch(err => { message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Time has ended. Prompt cancelled"))})
         })
       }).catch(err => { message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Time has ended. Prompt cancelled"))})
       })
       }).catch(err => { message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Time has ended. Prompt cancelled"))})
         })
       }).catch(err => { message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Time has ended. Prompt cancelled"))})
         })
       }).catch(err => { message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Time has ended. Prompt cancelled"))})      
    })
  }).catch(err => { message.author.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Time has ended. Prompt cancelled"))})
})
  
  
}

module.exports.help = {
  name: "play",
  aliases: [],
  description: "Find people to play with some games",
  category: "post",
  usage: " "
}