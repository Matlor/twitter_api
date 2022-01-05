const fs = require("fs");

require("dotenv").config();
const axios = require("axios");
const bearer_token = process.env.BEARER_TOKEN;
const endpointURL = "https://api.twitter.com/2/tweets/search/recent";

// axios POST request
const options = {
	url: endpointURL,
	method: "GET",
	headers: {
		"User-Agent": "v2RecentSearchJS",
		authorization: `Bearer ${bearer_token}`,
	},
	params: {
		query: "icp -is:retweet -is:reply -is:quote",
		max_results: 10,
	},
};

let totalCount = 0;
const getTweets = async () => {
	try {
		const response = await axios(options);
		console.log(response.data);
		totalCount += response.data.meta.result_count;
		console.log(totalCount, "total count");
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

// ---------------

const writeToFile = (content) => {
	let writer = fs.createWriteStream("./test/testData.json", {
		flags: "a",
		encoding: null,
		mode: 0666,
		start: 2,
	});

	// flags: "a",

	writer.write(JSON.stringify(content));
};

let interval = setInterval(async () => {
	let data = await getTweets();
	// deal with error here

	let content = data.data[0];
	writeToFile(content);

	if (data.meta.next_token == null) {
		clearInterval(interval);
	} else {
		options.params.next_token = data.meta.next_token;
	}
}, 3000);
