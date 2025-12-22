const activeThreads = new Set();
const emojis = ["😂","😍","🔥","😎","😆","😮","😢","💀","👍","🤩"];

module.exports = {
  config: {
    name: "autoreact",
    version: "8.0",
    author: "SaGor",
    countDown: 0,
    role: 0,
    shortDescription: "Auto eaction cmd ✨",
    longDescription: "a simple goat bot automatic reaction commands",
    category: "system"
  },

  onStart: async function({ api, event }) {
    const tid = event.threadID;
    if (activeThreads.has(tid)) {
      activeThreads.delete(tid);
      api.setMessageReaction("❌", event.messageID, () => {}, true);
    } else {
      activeThreads.add(tid);
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    }
  },

  onChat: async function({ api, event }) {
    if (!activeThreads.has(event.threadID)) return;
    api.setMessageReaction(emojis[(Math.random() * emojis.length) | 0], event.messageID, () => {}, true);
  }
};
