const axios = require("axios");

module.exports = {
    config: {
        name: "boom",
        version: "1.0",
        author: "SaGor",
        countDown: 5,
        role: 2,
        shortDescription: "Send single text from JSON up to 100 times",
        longDescription: "Fetches a single text from GitHub JSON and sends it multiple times (1-100) as separate messages",
        category: "fun",
        guide: "{p}{n} <number (1-100)>"
    },

    onStart: async function({ api, event, args }) {
        try {
            if (!args[0]) return api.sendMessage("Please provide a number (1-100).", event.threadID);

            let count = parseInt(args[0]);
            if (isNaN(count) || count < 1) return api.sendMessage("Number must be >=1.", event.threadID);
            if (count > 100) count = 100;

            const rawUrl = "https://raw.githubusercontent.com/SAGOR-KINGx/all-around/refs/heads/main/bom.json";
            const res = await axios.get(rawUrl);

            let text = res.data.text;
            if (!text || text.trim().length === 0) return api.sendMessage("JSON text is empty.", event.threadID);

            for (let i = 0; i < count; i++) {
                await api.sendMessage(text, event.threadID);
            }

        } catch (err) {
            console.error(err);
            api.sendMessage("Something went wrong while fetching the JSON.", event.threadID);
        }
    }
};
