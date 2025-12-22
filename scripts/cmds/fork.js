module.exports = {
  config: {
    name: "fork",
    version: "1.0.2",
    author: "Sagor",
    countDown: 5,
    role: 0,
    aliases: ["frok", "repo"],
    shortDescription: "Send fork link",
    longDescription: "Bot will reply with repo link when command is used",
    category: "tools"
  },

  onStart: async function ({ message }) {
    await message.reply("https://github.com/SAGOR-KINGx/GOAT-BOT-V2.git");
  }
};
