import React, { useEffect, useState } from 'react';
import { withStyles } from "@material-ui/core/styles";
import AddPost from './App/Components/AddPost/AddPost';
import PostsList from './App/Components/PostsList/PostsList';
import HeaderToolbar from './App/Components/HeaderToolbar/HeaderToolbar';
import {
  initSubscription,
  visibleTweetProvider,
  refreshTweets,
  allTweetProvider,
  clearTweets
} from './App/Services/Services'

const styles = () => ({
  body: {
    padding: '0px 20%',
  }
});

const App = ({ classes }) => {
  const [activeTweets, setActiveTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState([]);
  const [newPostsAvailable, setNewPostsAvailable] = useState(false);

  useEffect(() => {
    initSubscription();
    visibleTweetProvider.subscribe({
      next: (visibleTweets) => {
        setActiveTweets(visibleTweets);
      },
    });

    allTweetProvider.subscribe({
      next: (allTweets = []) => {
        if (allTweets.length >= activeTweets.length + 3) {
          if (!newPostsAvailable) {
            setNewPostsAvailable(true);
          }
        }
      },
    });
  },[]);

  useEffect(() => {
    return () => {
      visibleTweetProvider.unsubscribe()
      allTweetProvider.unsubscribe()
    }
  }, []);

  const toggleLike = (tweet) => {
    if (!tweet) {
      return;
    }
    if (likedTweets.find(tw => tw.id === tweet.id)) {
      setLikedTweets(likedTweets.filter(tw => tw.id !== tweet.id));
    } else {
      setLikedTweets(likedTweets.concat(tweet));
    }
  }

  const loadRecentTweets = () => {
    setNewPostsAvailable(false);
    refreshTweets();
    window.scrollTo(0, 0)
  }

  const clearAll = () => {
    clearTweets();
    setActiveTweets([]);
    setNewPostsAvailable(false);
    setLikedTweets([]);
  }

  return (
    <>
      <HeaderToolbar />
      <div className={classes.body}>
        <AddPost />
        <PostsList
          clearAll={clearAll}
          tweets={activeTweets}
          likedTweets={likedTweets}
          toggleLike={toggleLike}
          loadRecentTweets={loadRecentTweets}
          newPostsAvailable={newPostsAvailable}
        />
      </div>
    </>
  );
}

export default withStyles(styles)(App);