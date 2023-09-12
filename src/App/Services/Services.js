// rxjs is expoxed by
// https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.4.0/rxjs.umd.min.js
import { interval, merge, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

const createTweetSource = (frequency, account, attribute, accountId) => {
  return interval(frequency).pipe(
    map((i) => ({
      account,
      timestamp: Date.now(),
      content: `${attribute} Tweet number ${i + 1}`,
      id: `${accountId}-${Date.now()}`,
    }))
  )
}

const tweets = merge(
  createTweetSource(5000, 'AwardsDarwin', 'Facepalm', '1234'),
  createTweetSource(3000, 'iamdevloper', 'Expert', '2345'),
  createTweetSource(5000, 'CommitStrip', 'Funny', '3456')
)

const  initialState = {
  tweets: [],
  visibleTweets: [],
};

export const visibleTweetProvider = new BehaviorSubject([]);
export const allTweetProvider = new BehaviorSubject([]);

/**
 * Returns an array of tweets that are not older than the specified timestamp
 * @param {array} tweets
 * @param {number} time
 */
const getRecentTweets = (tweets, time = 30000) => {
  const recentTweets = [];
  const currentTime = new Date().getTime();
  let hasfinished = false;
  while (!hasfinished) {
    const lastTweet = tweets.pop();
    if (!lastTweet || !lastTweet.timestamp) {
      hasfinished = true;
    } else if (currentTime - lastTweet.timestamp <= time) {
      recentTweets.push(lastTweet);
    } else {
      hasfinished = true;
    }
  }
  // the tweets in the original array needed to be in the order of arrival of tweets
   initialState.tweets = [...recentTweets].reverse()
  return recentTweets
}

/**
 * Initiate the tweet subscription
 * The newer tweets are being added to the top of the  initialState.tweets stack
 * If the total tweets are less than 10, keep adding the newer tweets to the visibleTweets so that,
 * the user won't be seeing the half empty screen initially
 */
export const initSubscription = () => {
  tweets.subscribe((tweet) => {
     initialState.tweets.push(tweet)
    if ( initialState.tweets.length <= 5) {
      // If the total loaded tweets are less than 5 immediately add to visibleTweets
      // add to the beginning of the array
       initialState.visibleTweets.unshift(tweet)
      visibleTweetProvider.next( initialState.visibleTweets)
    }
    allTweetProvider.next( initialState.tweets)
  })
}

/**
 * Refreshing the tweets and visibleTweets array on user request
 * After the visibleTweets are updated, notify the component with BehaviorSubject
 */
export const refreshTweets = () => {
  // We only shows the tweets for the last 30 seconds
   initialState.visibleTweets = getRecentTweets( initialState.tweets, 30000)
  visibleTweetProvider.next( initialState.visibleTweets)
}

/**
 * Clear all posts
 */
export const clearTweets = () => {
   initialState.tweets = []
   initialState.visibleTweets = []
}
