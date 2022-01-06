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
		"tweet.fields":
			"author_id,attachments,context_annotations,conversation_id,created_at,entities,geo,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,withheld",

		max_results: 100,
	},
};

// 	start_time: "2022-01-04T12:59:00Z",
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

if (fs.readFileSync("./data.json").length === 0) {
	fs.writeFileSync("./data.json", JSON.stringify([]), "utf8");
}

const writeToFile = (content) => {
	const file = fs.readFileSync("./data.json");

	let tweets = JSON.parse(file);

	tweets.push(...content);

	fs.writeFileSync("./data.json", JSON.stringify(tweets), "utf8");
};

let interval = setInterval(async () => {
	data = await getTweets();
	// deal with error here

	writeToFile(data.data);
	if (data.meta.next_token == null) {
		clearInterval(interval);
	} else {
		options.params.next_token = data.meta.next_token;
	}
}, 3000);
