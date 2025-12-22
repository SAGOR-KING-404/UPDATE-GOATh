const axios = require("axios");
const fs = require("fs-extra");
const DIG = require("discord-image-generation");

module.exports = {
  config: {
    name: "affect",
    version: "1.0",
    author: "SaGor",
    countDown: 5,
    role: 0,
    category: "image",
    shortDescription: "Apply 'affect' meme effect to a user’s avatar",
    longDescription: "Generate a funny 'affect' meme using the profile picture of the tagged user or yourself",
    guide: {
      en: "{p}affect [@mention or reply]"
    }
  },

  onStart: async function ({ api, event }) {
    try {
      const mention = Object.keys(event.mentions)[0] || event.senderID;
      const response = await axios.get(
        `https://graph.facebook.com/${mention}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
        { responseType: "arraybuffer" }
      );

      const img = await new DIG.Affect().getImage(Buffer.from(response.data, "utf-8"));
      const path = __dirname + "/cache/affect.png";
      fs.writeFileSync(path, img);

      await api.sendMessage({ attachment: fs.createReadStream(path) }, event.threadID);
      fs.unlinkSync(path);
    } catch (err) {
      api.sendMessage(`❌ Error creating affect image: ${err.message}`, event.threadID);
    }
  }
};