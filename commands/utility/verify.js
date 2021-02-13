const getUser = require('roblox-user-information')
const discord = require('discord.js')
const { get } = require('request')


module.exports.run = async (client, message, args) => {

        try {
        const msg2 = message

            message.reply("The prompt will continue in your dms. If you don't recieve a dm, please check they are enabled and try again.").catch(error => {
                console.log("DM message error!")
            })
            msgFilter = (m) => m.author.id === message.author.id
            const PromptStartEmbed = new discord.MessageEmbed()
                .setTitle("Prompt")
                .setDescription("Would you like to verify with ``Roblox`` or ``Discord``?")
                .setFooter("The prompt will end in 300 seconds (5 minutes).")
                .setTimestamp()
                .setColor('#FFFAFA')

            message.author.send(PromptStartEmbed).then(dmChannel => {
                dmChannel.channel.awaitMessages(msgFilter, { max: 1, time: 300000, errors:['time']})
                    .then((VerifiyFormat) => {
                        if(!VerifiyFormat.first()) return message.author.send("I don't know where you went. We can try this again later.")
                        const VerifyOption = VerifiyFormat.first();
                        if(!VerifyOption.content.toLowerCase() === "roblox") return message.author.send("The selected option is invalid. Please say !verify again.")

                        if(VerifyOption.content.toLowerCase() === "roblox"){
                            message.author.send("What is your ROBLOX username?")
                            dmChannel.channel.awaitMessages(msgFilter, { max: 1, time: 300000, erros:['time']})
                                .then(async (UsernameCollected) => { 
                                    const InputUsername = UsernameCollected.first();
                                    if(!InputUsername) return message.channel.send("No username provided. Prompt cancelled!")
                                    
                                    const RbxUser = await getUser(InputUsername.content)
                              
                                   
                                   

                                    
                                    if(RbxUser.success === false) return message.channel.send("I couldn't find that user. Prompt cancelled!")
                                    const PossibleStrings = ['lol memes', 'cool hotdog bro', 'birds are nice wow', 'wow! nice view', 'epic day right', 'play video games lol']
                                    var randNumb2 = Math.floor(Math.random() * 5)
                                    randNumb = PossibleStrings[randNumb2]
                                    const RandomNumberEmbed = new discord.MessageEmbed()
                                        .setTitle("Prompt")

                                        .setDescription(`Hello! To verify you are that user, please set your roblox status to the following.

                                        **Say** done when done
                                        **Say** cancel to cancel`)
                                        .addField("Status", `**${randNumb}**`)
                                        .setFooter(`Player ID is ${RbxUser.id}`)
                                        .setTimestamp()
                                        .setColor('#FFFAFA')

                                    message.author.send(RandomNumberEmbed)
                                    dmChannel.channel.awaitMessages(msgFilter, { max: 1, time: 300000, errors:['time']})
                                        .then(async (FinalDecCollected) => {
                                            const lastDec = FinalDecCollected.first();
                                            if(!lastDec) return message.author.send("I don't know where you went. Prompt cancelled!")
                                             
                                            if(lastDec.content.toLowerCase() === "done"){
                                                const RbxUser2 = await getUser(InputUsername.content)

                                                
                                                
                                                if(RbxUser2.success === false) return message.channel.send("An error occured. Prompt cancelled!")
                                            
                                                if(RbxUser2.status === randNumb){
                                                    const verifiedStatus = new discord.MessageEmbed()
                                                        .setTitle("Prompt")
                                                        .setDescription("You have been verified! Please wait while I give you the Verified role!")
                                                        .setFooter("Verifying...")
                                                        .setTimestamp()
                                                        .setColor('#FFFAFA')

                                                    message.author.send(verifiedStatus)
                                                    
                                                    return;
                                                }else{
                                                    message.author.send("Verification Failed! Prompt cancelled!")
                                                    return;
                                                }

                                               

                                            }
                                            message.channel.send("Cancelled Prompt!")


                                        })
                                    
                                    

                                })



                        }
                        if(VerifyOption.content.toLowerCase() === "discord"){
                            const Alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
                            const alphaNumber = Math.floor(Math.random() * 25)
                            const chosenLetter = Alphabet[alphaNumber]
                            const RandomNumbers = Math.floor(Math.random() * 100000).toString()
                            const FinalString = chosenLetter.concat(RandomNumbers)
                            message.author.send(`Please type the following in chat: ${FinalString}`)
                            dmChannel.channel.awaitMessages(msgFilter, { max: 1, time: 300000, errors:['time']})
                                .then(async (Discord_Verify_Collected) => {
                                    const DV_Response = Discord_Verify_Collected.first();
                                    if(!DV_Response) return message.channel.send("I don't know what happened! Promot cancelled!")
                                    if(DV_Response.content.toString().toLowerCase() === FinalString){
                                        message.channel.send("You are verified! Give me one sec to add the ``verified`` role!")
                                        //ADD SOMETHING TO BE DONE HERE!!!!!!
                                    }
                                }) 


                        }
                    })
            })

        } catch (error) {
            console.log("Error with verify.js!")
        }
    }


module.exports.help = {
    name: "verify",
    aliases: [],
    description: "Verify your roblox or discord account",
    usage: " ",
    category: "utility"
  }
