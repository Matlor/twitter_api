const fs = require("fs");

require("dotenv").config();
const axios = require("axios");
const bearer_token = process.env.BEARER_TOKEN;
const endpointURL =
	"https://api.twitter.com/2/users/1075900190178111488/followers";

// axios POST request
const options = {
	url: endpointURL,
	method: "GET",
	headers: {
		"User-Agent": "test",
		authorization: `Bearer ${bearer_token}`,
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
