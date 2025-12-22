const request = require("request");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "poke",
    version: "1.0.0",
    author: "SaGor",
    countDown: 5,
    role: 0,
    shortDescription: "Poke a friend",
    longDescription: "Send a random poke GIF to a mentioned user",
    category: "fun"
  },

  onStart: async function ({ message, event }) {
    const gifs = [
      "https://i.postimg.cc/W43LzFn1/dkUlEBe.gif",
      "https://i.postimg.cc/mr5xHLXN/squeeze-dat-ass-001.gif",
      "https://i.postimg.cc/V6rx9x2y/tumblr-0a7f78ae0514fd8654409bd7e2410068-a200b089-500.gif",
      "https://i.postimg.cc/rs573S8Q/tumblr-os64hm-Sc-AN1smwom8o10-1280.gif"
    ];

    const mentionIDs = Object.keys(event.mentions);
    if (!mentionIDs.length) return message.reply("⚠️ Please mention 1 person!");

    const targetName = event.mentions[mentionIDs[0]].replace("@", "");
    const cachePath = path.join(__dirname, "cache", "poke.gif");

    request(encodeURI(gifs[Math.floor(Math.random() * gifs.length)]))
      .pipe(fs.createWriteStream(cachePath))
      .on("close", async () => {
        await message.reply({
          body: `👋 ${targetName}, you got poked!`,
          mentions: [{ tag: targetName, id: mentionIDs[0] }],
          attachment: fs.createReadStream(cachePath)
        });
        fs.unlinkSync(cachePath);
      });
  }
};