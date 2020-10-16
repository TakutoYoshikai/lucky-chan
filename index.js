const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require("fs")

client.on("ready", () => {
  console.log(`logged in as ${client.user.username}`)
})

const replyList = JSON.parse(fs.readFileSync("reply.json", "utf-8"))

for (let rep of replyList) {
  for (let _rep of replyList) {
    if (rep.reply.includes(_rep.msg)) { 
      console.log("detected loop word")
      console.log("msg: " + _rep.msg)
      console.log("reply: " + rep.reply)
      process.exit();
    }
  }
}

client.on("message", async msg => {
  for (let rep of replyList) {
    if (msg.content.includes(rep.msg)) {
      msg.channel.send(rep.reply)
    }
  }
})

client.login(fs.readFileSync("token", "utf-8").replace("\n", ""))
