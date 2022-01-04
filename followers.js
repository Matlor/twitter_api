const fs = require("fs");

require("dotenv").config();
const axios = require("axios");
const bearer_token = process.env.BEARER_TOKEN;
const endpointURL = "https://api.twitter.com/1.1/followers/ids.json";

// axios POST request
const options = {
	url: endpointURL,
	method: "GET",
	headers: {
		"User-Agent": "test",
		authorization: `Bearer ${bearer_token}`,
	},
	params: {
		ids: "1429067770940084233",
		/* query: "#icp -is:retweet -is:reply -is:quote",
		"tweet.fields":
			"author_id,attachments,context_annotations,conversation_id,created_at,entities,geo,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,withheld",
		start_time: "2022-01-02T12:59:00Z",
		max_results: 100, */
	},
};

// 	"User-Agent": "v2RecentSearchJS",

const getFollowers = async () => {
	try {
		const response = await axios(options);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error.response.data.errors);
	}
};

getFollowers();
