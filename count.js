require("dotenv").config();
const axios = require("axios");
const token = process.env.BEARER_TOKEN;
const countURL = "https://api.twitter.com/2/tweets/counts/recent";

// axios POST request
const options = {
	url: countURL,
	method: "GET",
	headers: {
		"User-Agent": "v2RecentTweetCountsJS",
		authorization: `Bearer ${token}`,
	},
	params: {
		query: "icp -is:retweet -is:reply -is:quote",
	},
};

// 	start_time: "2022-01-04T12:59:00Z",

async function getTweetCount() {
	try {
		const response = await axios(options);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

getTweetCount();
