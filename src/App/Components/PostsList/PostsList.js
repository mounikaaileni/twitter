import React,  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import DeleteForeverOutlined from '@material-ui/icons/DeleteForeverOutlined';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Post from '../Post/Post';
import Loader from '../Loader/Loader';

const styles = () => ({
  tweet: {
    padding: '20px 0px',
  },
  loadPosts: {
    position: 'fixed',
    backgroundColor: '#ffffff',
    left: 'calc(50% - 75px)',
    zIndex: 1,
    bottom: '40px',
    opacity: '0.8',
    '& button': {
      backgroundColor: 'lightblue'
    }
  },
  postActions: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  deletePosts: {
    
  },
  formControl: {
    margin: '10px',
    minWidth: 120,
  },
});

const PostsList = ({ tweets, likedTweets, toggleLike, classes, newPostsAvailable, loadRecentTweets, clearAll }) => {
  const [postFilter, setPostFilter] = useState('all');
  const [filteredTweets, setFilteredTweets] = useState([]);

  useEffect(() => {
    tweets.length > 0 && postFilter === 'all' && setFilteredTweets(tweets);
  }, [tweets, likedTweets]);

  const handleChange = (event) => {
    setPostFilter(event.target.value);
    event.target.value === 'liked' ? setFilteredTweets(likedTweets) : setFilteredTweets(tweets);
  };

  if (tweets.length === 0) {
    return <Loader />
  }

  return (
    <div>
      <div className={classes.loadPosts}>
        {newPostsAvailable && <Button variant="outlined" onClick={() => loadRecentTweets()}>Load New Posts</Button>}
      </div>
      <div className={classes.postActions}>
        <FormControl className={classes.formControl}>
          <Select
            native
            value={postFilter}
            onChange={handleChange}
            inputProps={{
              name: 'post-filter',
              id: 'post-filter',
            }}
          >
            <option value={'all'}>All Posts</option>
            <option value={'liked'}>Liked Posts</option>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => clearAll()}
          className={classes.deletePosts}
          startIcon={<DeleteForeverOutlined />}
        >
          Delete All Posts
        </Button>
       
      </div>
      {filteredTweets.map((tweet, i) => (
        <div className={classes.tweet} key={`${tweet.timestamp}-${i}`}>
          <Post 
            tweet={tweet}
            isLiked={!!likedTweets.find(tw => tw.id === tweet.id)}
            toggleLike={toggleLike}
          />
        </div>
      ))}
    </div>
  )
}

PostsList.propTypes = {
  tweet: PropTypes.object,
  likedTweets: PropTypes.array,
  toggleLike: PropTypes.func,
  classes: PropTypes.object,
  newPostsAvailable: PropTypes.bool,
  loadRecentTweets: PropTypes.func,
  clearAll: PropTypes.func,
}

export default withStyles(styles)(PostsList)