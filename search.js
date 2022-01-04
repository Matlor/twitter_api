const fs = require("fs");

require("dotenv").config();
const axios = require("axios");
const bearer_token = process.env.BEARER_TOKEN;
const endpointURL = "https://api.twitter.com/2/tweets/search/recent";

/* 

hashtag ICP is 2800
ICP as keyword is 9793
I could do the keyword


NEXT STEPS:
- include as many user.fields as possible
- as many tweet fiels as possible
1) set for as much data as possible -> search done
1.1) delete all the data I have now in the files
1.2) check if lookups cost api credits

2) perfor a large search for tweets
3) Check if the neweset 30% of tweets are mostly doubles or not - this I could use to determine how much I should crawl
4) run into the rate limits on purpose



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

const writeToFile = (content) => {
	if (fs.readFileSync("./data.json").length === 0) {
		fs.writeFileSync("./data.json", JSON.stringify([]), "utf8");
	}

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
