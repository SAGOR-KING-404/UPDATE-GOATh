const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "surah",
    version: "1.0.0",
    author: "SaGor",
    countDown: 5,
    role: 0,
    shortDescription: "Play random Islamic Surah audio",
    longDescription: "Sends a random Islamic Surah audio file from Drive links",
    category: "media"
  },

  onStart: async function ({ message, event }) {
    const links = [
      "https://drive.google.com/uc?id=1-9idslRZAmPWrktKMRWywsOGTrhJwufn",
      "https://drive.google.com/uc?id=1-cSfVhLzFR7-2OEqi_r_h7WPwyztNbX9",
      "https://drive.google.com/uc?id=1zkzDYqsYys7idKeV3sxtDBO2zYLcce78",
      "https://drive.google.com/uc?id=1-h4QAwp0fbOuiI02wBWHgnlZ67OcntXh",
      "https://drive.google.com/uc?id=1-2Npr1WfC5U_vUtX-ocRbs-92WfeO3C4",
      "https://drive.google.com/uc?id=1zs5vmoljY7MS8pfNf6_HidfucP0-Qvu_",
      "https://drive.google.com/uc?id=1EkEL_ci9pCAVdqLed23EI-Wk_xem6jnn",
      "https://drive.google.com/uc?id=1-CIHqFkF6Zj3IJ6u4OuN5Z_rBL02ICba",
      "https://drive.google.com/uc?id=1-CoomuQjCU0lzpVf87E0zBQrR-S9nHVj"
    ];

    const randomLink = links[Math.floor(Math.random() * links.length)];
    const cachePath = path.join(__dirname, "cache", "surah.mp3");

    try {
      const response = await axios.get(randomLink, { responseType: "arraybuffer" });
      await fs.outputFile(cachePath, response.data);
      await message.reply({
        body: "📿 **Islamic Surah**",
        attachment: fs.createReadStream(cachePath)
      });
      fs.unlinkSync(cachePath);
    } catch (e) {
      message.reply("❌ Failed to fetch Surah audio. Please try again later.");
    }
  }
};