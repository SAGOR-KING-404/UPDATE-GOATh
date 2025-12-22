const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const request = require("request");

module.exports = {
  config: {
    name: "messi",
    version: "1.0.0",
    author: "SaGor",
    countDown: 5,
    role: 0,
    shortDescription: "Random Messi images",
    longDescription: "Sends a random Lionel Messi image from a predefined list",
    category: "media"
  },

  onStart: async function ({ message, event }) {
    const images = [
      "https://i.postimg.cc/SKyn3RW9/images-52.jpg",
      "https://i.postimg.cc/8crcM6V2/images-51.jpg",
      "https://i.postimg.cc/8zGdk1Rp/images-50.jpg",
      "https://i.postimg.cc/Z5jNT6YH/Lionel-Messi-20180626.jpg",
      "https://i.postimg.cc/zfcRh5gR/images-43.jpg",
      "https://i.postimg.cc/Y0k2GybW/images-42.jpg",
      "https://i.postimg.cc/NMvBSzhz/images-41.jpg",
      "https://i.postimg.cc/9QvhwnfQ/images-40.jpg",
      "https://i.postimg.cc/WpXcw34K/images-38.jpg",
      "https://i.postimg.cc/gJjH9Nv3/images-37.jpg",
      "https://i.postimg.cc/zXrpvS5Y/images-61.jpg",
      "https://i.postimg.cc/BvXBkm5H/images-60.jpg",
      "https://i.postimg.cc/BbG58srB/images-59.jpg",
      "https://i.postimg.cc/tRhtKZ6S/images-58.jpg",
      "https://i.postimg.cc/pXs8vDLZ/images-57.jpg",
      "https://i.postimg.cc/cHGthhFs/images-56.jpg",
      "https://i.postimg.cc/R0KNWf42/images-55.jpg",
      "https://i.postimg.cc/yxYdpbcz/images-54.jpg",
      "https://i.postimg.cc/mDT2h5dF/images-63.jpg",
      "https://i.postimg.cc/RCsVVGwN/images-62.jpg"
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const cachePath = path.join(__dirname, "cache", "messi.jpg");

    request(encodeURI(randomImage))
      .pipe(fs.createWriteStream(cachePath))
      .on("close", async () => {
        await message.reply({
          body: "⚽ Random Messi Image",
          attachment: fs.createReadStream(cachePath)
        });
        fs.unlinkSync(cachePath);
      });
  }
};