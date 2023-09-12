import * as React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';

const Loader = () => {
  return (
    <div>
      <Backdrop
        style={{backgroundColor: 'transparent'}}
        open={true}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}

export default Loader;