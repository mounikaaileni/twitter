import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Favorite, FavoriteBorderOutlined } from '@material-ui/icons';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from 'clsx';

const styles = () => ({
  post: {
    '&.likedPost': {
      borderImageSource: 'linear-gradient(to left, #743ad5, #d53a9d)',
    }
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  notice: {
    color: 'orange',
  },
  userAccount: {
    padding: '0px 20px 0px 5px',
    fontWeight: 'bold'
  },
  postContent: {
    padding: '10px 24px',
  },
  comment: {
  },
  retweet: {
  },
  tweetActions: {
    display: 'flex',
    justifyContent: 'space-between',
  }
});

const Post = ({ tweet, isLiked, toggleLike, classes }) => {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000)

    return () => clearTimeout(timer)
  }, [showHint])

  if (!tweet) {
    return 'null'
  }

  return (
    <div className={clsx(classes.post, isLiked && 'likedPost')}>
      <div className={classes.userInfo}>
        <AccountCircleIcon />
        <Typography variant="body2" className={classes.userAccount}>{tweet.account}</Typography>
        <Typography variant="body2">{moment(tweet.timestamp).format('hh:mm a')}</Typography>
      </div>
      <Typography variant="body1" className={classes.postContent}>{tweet.content}</Typography>
      <div className={classes.tweetActions}>
        <Button
          className={classes.likeButton}
          onClick={() => {
            toggleLike(tweet)
          }}
        >
          {isLiked ? <Favorite /> : <FavoriteBorderOutlined />}
        </Button>
        <Button
          className={classes.comment}
          onClick={() => {
            setShowHint(true)
          }}
        >
          <ChatBubbleOutlineIcon />
        </Button>
        <Button
          className={classes.retweet}
          onClick={() => {
            setShowHint(true)
          }}
        >
          <AutorenewIcon />
        </Button>
      </div>
      {showHint && <Typography variant="body2" className={classes.notice}>Nothing happens for now on comment and retweet. You can test like button</Typography>}
    </div>
  )
}

Post.propTypes = {
  tweet: PropTypes.object,
  isLiked: PropTypes.bool,
  toggleLike: PropTypes.func,
  classes: PropTypes.object,
}

export default withStyles(styles)(Post);
