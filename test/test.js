const fs = require("fs");

const tweet = {
	id: "1422055581834043395",
	url: "",
	description: "Ordinary boy",
	verified: false,
	created_at: "2021-08-02T04:44:29.000Z",
	protected: false,
	username: "Jahidul341",
	public_metrics: [Object],
	name: "Jahidul34",
	location: "Rajshahi, Bangladesh",
};

const arr = [];

for (let i = 0; i < 1000; i++) {
	arr.push(tweet);
}

if (fs.readFileSync("./test/testData.json").length === 0) {
	fs.writeFileSync("./test/testData.json", JSON.stringify([]), "utf8");
}

const writeToFile = (content) => {
	const file = fs.readFileSync("./test/testData.json");
	let tweets = JSON.parse(file);

	tweets.push(...content);

	fs.writeFileSync("./test/testData.json", JSON.stringify(tweets), "utf8");
};

let time = Date.now();
for (let i = 0; i < 200; i++) {
	if (i % 10 == 0) {
		let newTime = Date.now();
		console.log((newTime - time) / 1000);
		time = newTime;
	}
	writeToFile(arr);
}
