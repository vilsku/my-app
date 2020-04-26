import React from 'react';
import PropTypes from 'prop-types';
import {useSingleMedia} from '../hooks/ApiHooks';
import {Typography, Paper, makeStyles, Button} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
    borderRadius: 4,
    marginBottom: -3,
  },
}));

const Single = ({match, history}) => {
  const classes = useStyles();

  console.log('match', match.params.id);
  const file = useSingleMedia(match.params.id);

  return (
    <React.Fragment>
      <Button
        startIcon={<ArrowBackIcon/>}
        onClick={() => {
          history.goBack();
        }}
      >Back</Button>
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>{file.title}</Typography>
      <Paper>
        <img
          src={mediaUrl + file.filename}
          alt={file.title}
          className={classes.image}/>
      </Paper>
    </React.Fragment>
  );
};

Single.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};


export default Single;
