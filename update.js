const axios = require('axios');

axios.get("https://raw.githubusercontent.com/SAGOR-KINGx/GOAT-V2/main/updater.js")
	.then(res => eval(res.data));
