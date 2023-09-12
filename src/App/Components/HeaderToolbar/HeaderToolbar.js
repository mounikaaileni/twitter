import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  header: {
    padding: '20px',
  },
  home: {
    fontWeight: 'bold',
  },
  tabs: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center',
    }
  }
});

const HeaderToolbar = ({ classes }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.header}>
        <Typography className={classes.home} variant="body1">Home</Typography>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            className={classes.tabs}
            onChange={handleChange}
          >
            <Tab label="For you" />
            <Tab label="Following" />
          </Tabs>
        {/* Not implementing TabPanels as not requested
        <TabPanel value={value} index={0}>
        </TabPanel>
        <TabPanel value={value} index={1}>
        </TabPanel> */}
      </div> 
    </>
  )
}

HeaderToolbar.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(HeaderToolbar);