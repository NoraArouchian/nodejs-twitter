var TwitterStream = require('twitter-stream-api'),
    fs = require('fs');

var keys = {
    consumer_key : "7GToYZlnbKMqiUSuhI6VX7Sgp",
    consumer_secret : "3MfriFRZqOTB3mWoOrE90NvjOZFolrL17gsa5BT3wWyJ0zvBce",
    token : "1084074438-Ul05yRAREfimWp1DIrXAtyc4KiZJB4zWB9SnMd8",
    token_secret : "LPVcm4af3af4MgcvNdV0evnRV2Fr15dJjH3j3QdCIvWmh"
};

var Twitter = new TwitterStream(keys, false);
Twitter.stream('statuses/filter', {
    track: 'wow',
    stall_warnings: true
});

// Twitter.debug(function (reqObj) {
//     require('request-debug')(reqObj, function (type, data, req) {
//         console.log(type, data, req);
//     });
// });

Twitter.on('connection success', function (uri) {
    console.log('connection success', uri);
});

Twitter.on('connection aborted', function () {
    console.log('connection aborted');
});

Twitter.on('connection error network', function (error) {
    console.log('connection error network', error);
});

Twitter.on('connection error stall', function () {
    console.log('connection error stall');
});

Twitter.on('connection error http', function (httpStatusCode) {
    console.log('connection error http', httpStatusCode);
});

Twitter.on('connection rate limit', function (httpStatusCode) {
    console.log('connection rate limit', httpStatusCode);
});

Twitter.on('connection error unknown', function (error) {
    console.log('connection error unknown', error);
    Twitter.close();
});

Twitter.on('data', function (obj) {
    console.log('data BUFFER', obj);
    console.log('string conversion of BUFFER',ab2str(obj))
    var tweet_string = ab2str(obj);
    var prettyTweet = JSON.stringify(JSON.parse(tweet_string),null,2)
    fs.appendFileSync('tweets_pretty.json', prettyTweet);
});

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

Twitter.pipe(fs.createWriteStream('tweets.json'));
