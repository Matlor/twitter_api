const fs = require("fs");
console.log("ee");

const path = require("path");
const file = fs.readFileSync(path.resolve(__dirname, "../data.json"));
const tweets = JSON.parse(file);
console.log(tweets);

let uniqueAuthors = [];
const onlyUnique = (value, index, self) => {
	return self.indexOf(value) === index;
};

if (tweets.length > 0) {
	let authors = [];

	for (let i = 0; i < tweets.length; i++) {
		authors.push(tweets[i].author_id);
	}

	uniqueAuthors = authors.filter(onlyUnique);
	fs.writeFileSync(
		"./users_lookup/uniqueAuthors.json",
		JSON.stringify(uniqueAuthors),
		"utf8"
	);
} else {
	console.log("file seems to be empty");
}
