/* 
------ Project Plan -------

- For the same Search Criteria -
-> FOCUSED ON THAT ATM!!

Search Tweets Continuously
1. Getting Tweets with specific search criteria - this can happen regularly
2. From the tweets, get a list of the unique author IDs
3. Check if I have the IDs already in the database
4. For the ones that I don't have in the database, get info and save in database
5. For the ones that are in the database and tweeted again, assign points, they are more core community members
Improvements:
- improve filter criteria


Follower Data Mining
1. Should I get the followers of the followrs?
2. How will that work over time?


Network Analysis
1. Check who follows who
2. Identify the network structure of projects
3. Study the structure of the network
4. Run a community detection algorithm
Improvements:
- gives weights to relationship between people and between the person and the community
- community could be if he has ICP in his profile or not

--------------------------------

- For different Search Criteria -
Problems:
- we can have the situation that one search is ICP and the other is #ICP
- that makes is weird then to study who is in the dataset and who is not


- Data Over Time -
Problems:
- People can stop to tweet about a topic
- People can be more or less engaged about a topic
- The network can expand -> update the list regularly with the same search criteria -> how many are new uniques is indication how much to crawl
- People can be advertising -> filter them out
- People can talk in a language that nobody is writing in or that is not useful to study
- My search could be changing, are old authors crap? Should they be dropped from the dataset?
- I could do data validation all the time - Study sample tweets of people to judge if we kick them out or not
- Should I ever kick out people?
- The data should be stored online and continously be expanded and contracted only like that I can make realy time gambles
- Commmitment to the topic is one data point and other is their position in the network - both could be useful



---- Understanding Twitter -----

quotes: Are retweets with something written above

verified: blue thing next to name. Only famous people

Annotations:
Tweets are studied by Twitter and then they are given context.
Entitiy Annotations: people, places, products and organisations
Context Annotattions: includes a domain and entity pairing. 50+ domains right now. 


Cashtags: I cannot search for $eth. Only researchers and businesses
- does a keyword include these? if I search for 'eth' will it include $eth

Keyword:
the keywords are searched in a tokenised way. That means coca-cola could be considered coca cola.
to include that I need to put my keyword in quotes "coca cola"
It does include cashtags if I just type in eth. so it will also have $eth in it then

Nullcast:
-  -is:nullcast this is not in the basic api included


Recent Search Pagination:
- if there are more tweets than what I just got back I will receive a next_token.
- when there are not tweets left the token will be empty
- tweets come back in chronological order. First I get back is latest tweet
- with max_results I can say how many I want to get back. Defaults to 10 and has maximum of 100.
- I have to include the next_token in the next search request (parsed) if I want to get the related data


Get Historical:
- I can use start_time and end_time in the request parameters. 
- Tweets will nevertheless be delivered in reverse order. So I would get the one most closest to the end_time I think
- if not end_time specified it defaults to "now". Actually 30 seconds before the query was sent.
- start_time defaults to 7 days ago
- to get all data - do requests until no next_token is there
- If I need to get all data I can search them until request.next_token is equal to null
- mmh it probably only gets the ones in the time interval. So it takes all of them assignes the token and then I can run that
- until the next_token is null


Volume
- to get an estimate on my search I can first send a query for: GET /2/tweets/counts/recent
- that means I get an estimate first and then I could do the thing with the token and get them all


Polling:
- has to do with very real-time-focused apps. not important


Rate limit:
- seems like 180 requests per 15 minutes. That means one every 5 seconds: https://developer.twitter.com/en/docs/twitter-api/rate-limits


Language filtering?
- could do this later potentially



Field:
- these I can get for free. Seperated into:
- Tweet: 
- User: 
- Spaces:
- Lists:
- Media: What kind of media. Also contains something about promoted -> MEH
- Poll: When someone runs a poll, the results -> NA
- Place: Where the tweet/author is based -> MEH
URL: https://developer.twitter.com/en/docs/twitter-api/fields
- Ahh it seems like tweets is for search, users is for the lookout api. The others are mostly extending this stuff
- Ok so I can add nearly all of the tweet.fields. Some are only for user with access (not sure what that means)


Follower Data
- So the API 2.0 just points to the 1.1 in that regard. 
- The follower list and so on is a separate API endpoint
- There is a difference between list and ids. Ids are just the follower Ids. Lists are the objects themselves but from old API
- There is difference between friends and followers: Friends are the ones I follow (followees)
- there is endpont friendships/show. I can give it two users and it tells me how they are related includes blocking but not thaat interesting
- So basically 5 interesting endpoint: followers/ids, followers/list, friends/ids, friends/list, friendships/show
- I would need to just add that data to a user object. Maybe in a new database? -> no I make that a process of lookup
- To get that data I basically need to have the elevated access. Will allow me to get 2M data as well


Expansions???


Large Scale Collection Problems
- the formatting of the file takes very long
- formatting does not work




There is that about crypto:
	{
				"domain": {
					"id": "66",
					"name": "Interests and Hobbies Category",
					"description": "A grouping of interests and hobbies entities, like Novelty Food or Destinations"
				},
				"entity": {
					"id": "913142676819648512",
					"name": "Cryptocurrencies",
					"description": "Cryptocurrency"
				}
			},


{
				"domain": {
					"id": "47",
					"name": "Brand",
					"description": "Brands and Companies"
				},
				"entity": {
					"id": "1007360414114435072",
					"name": "Bitcoin cryptocurrency",
					"description": "Bitcoin Cryptocurrency"
				}
			},


	{
				"domain": {
					"id": "47",
					"name": "Brand",
					"description": "Brands and Companies"
				},
				"entity": {
					"id": "1007361429752594432",
					"name": "Ethereum cryptocurrency",
					"description": "Ethereum Cryptocurrency"
				}
			},

{
				"domain": {
					"id": "47",
					"name": "Brand",
					"description": "Brands and Companies"
				},
				"entity": {
					"id": "1233432562191593472",
					"name": "Algorand cryptocurrency"
				}
			},			



			

Maybe V1.1 instead of 2. There I can just pay to use

query: "from:metagouverneur -is:retweet",



*/

/* 

---------------------------------------------------------------
DONE:


1) Get all the users that tweet about the IC in this time period:
- improve search query to exclude stuff that does not make sense (retweets and so on)
-> filter out retweet -filter:retweets
-> filter out reply 
(sarah -> retweet_count = 0 )
(retweeted = false)
-> -is:retweet
-> -is:reply
-> is:quote -> what is? -> Returns all Quote Tweets, also known as Tweets with comments.
-> is:verified -> what is? -> no -> that is only sandy and so on
-> -is:nullcast -> filter out that are promotional


-> $ -> ?
-> # -> yes!
-> keyword? -> second iteration

-> context: -> same as annotations
-> annotations -> check what this is
-> not prio for now




2) How do time periods work?

3) how can I get a lot of data




 fs.appendFile(`${path}/data.json`, content, err => {
		if (err) {
		  console.error(err)
		  return
		}
		console.log("file is written")
	  }) 



	  4) testing to get a lot of data
- send an estimate for some search request
- send the search 
- iterate over the pagination
- considere the rate limit


5) do a bigger search (20 *10)
- write to file



6) what data do I get exactly? What can I get for free?
- write the data to some file
- do pagination, or somehow achieve that you can get a lot of data
- get all the users of that data
- get all the unique users of that data
- fetch more, check how the rate of new users drops



//module.exports = { getTweetCount };

 const test = async () => {
	let data = await count.getTweetCount();

	//writeToFile(JSON.stringify(data));
};

test();



6) lookup users
- get all the users of that data
- get all the unique users of that data




ERROR API: error.response.data.errors
*/
