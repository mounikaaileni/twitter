import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  addPostContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  post: {
    maxWidth: '100px',
    display: 'flex',
    alignSelf: 'end',
    margin: '10px 0px 15px',
  },
  notice: {
    color: 'orange',
  },
  content: {
    '&::placeholder': {
      paddingLeft: '20px'
    }
  }
});

const AddPost = ({ classes }) => {
  const [value, setValue] = useState('');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000)

    return () => clearTimeout(timer)
  }, [showHint])

  const onChange = (e) => {
    setValue(e.currentTarget.value)
  };

  const addPost = () => {
    // Does nothing for now as not requested for this functionality
    setShowHint(true);
  }

  return (
    <div className={classes.addPostContainer}>
      <textarea
        className={classes.content}
        placeholder="What's happening :) ... "
        value={value}
        onChange={onChange}
      />
      {showHint && <Typography variant="body2" className={classes.notice}>Does nothing for now as not requested for this functionality</Typography>}
      <Button variant="contained" className={classes.post} onClick={addPost} >Post</Button>
    </div>
  )
}

AddPost.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(AddPost);