const fs = require("fs");

require("dotenv").config();
const axios = require("axios");
const bearer_token = process.env.BEARER_TOKEN;
const endpointURL = "https://api.twitter.com/2/tweets/search/recent";

/* 

hashtag ICP is 2800
ICP as keyword is 9793
I could do the keyword

Problem: From the unique ones I could not fetch all of them. About 30 were lost
- I have to do data validation


NEXT STEPS:

2) test when the loading of the array becomes a problem

3) Update the data by a new search! Think through how much a month would take if done continously!
- but of course sample would be enough if the new tweets are all from old user (to large extend)

4) I have to have the follower relationship otherwise it is useless


5) run into the rate limits on purpose



Later)
- followers/friend -> when elevated access
- then check their mutual followers
- check if token_next is really null at some point -> yes it seems to the script stopped
*/

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
