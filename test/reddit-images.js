const { reddit } = require("reddit.images");


reddit.FetchSubredditPost({ subreddit: 'NotMyJob' }).then((data) => {
	console.log('FetchSubredditPost Example:');
	console.log(data);
});