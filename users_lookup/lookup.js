require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const bearer_token = process.env.BEARER_TOKEN;
const endpointURL = "https://api.twitter.com/2/users";
const path = require("path");

// --- Read and parse uniqueAuthor file
const file = fs.readFileSync(path.resolve(__dirname, "./uniqueAuthors.json"));
const uniqueAuthors = JSON.parse(file);

const options = {
	url: endpointURL,
	method: "GET",
	headers: {
		"User-Agent": "v2UserLookupJS",
		authorization: `Bearer ${bearer_token}`,
	},
	params: {
		ids: "1352732279307722754",
		"user.fields":
			"created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld",
	},
};
// id,description,created_at,url,username,profile_image_url

const getUsers = async () => {
	try {
		const response = await axios(options);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error.response.data.errors[0]);
	}
};

const writeToFile = (content) => {
	if (fs.readFileSync(path.resolve(__dirname, "./users.json")).length === 0) {
		fs.writeFileSync(
			path.resolve(__dirname, "./users.json"),
			JSON.stringify([]),
			"utf8"
		);
	}

	const file = fs.readFileSync(path.resolve(__dirname, "./users.json"));

	let users = JSON.parse(file);

	users.push(...content);

	fs.writeFileSync(
		path.resolve(__dirname, "./users.json"),
		JSON.stringify(users),
		"utf8"
	);
};

let partOfAuthors = [];

// max 100 is allowed
let delta = 10;
let i = 0;

let interval = setInterval(async () => {
	i += delta;
	if (i >= uniqueAuthors.length + 10) {
		clearInterval(interval);
	} else {
		partOfAuthors = uniqueAuthors.filter(
			(id, idx) => idx < i && idx >= i - delta
		);

		options.params.ids = partOfAuthors.join(",");

		let response = await getUsers();
		let data = response.data;

		writeToFile(data);
	}
}, 3000);
