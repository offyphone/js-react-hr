import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { getMutualFriends } from "../../actions/friend";
import FriendItem from "./FriendItem";
import { Typography, Paper } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles(theme => ({
  paper: {
    minWidth: 370
  },
  card: {
    margin: theme.spacing(2),
    maxWidth: 345
  },
  media: {
    height: 140
  },
  alone: {
    textAlign: "right"
  },
  dialog: {
    margin: theme.spacing(10, 0, 10, 0),
    padding: theme.spacing(10, 0, 10, 0)
  }
}));

const Friends = ({ getMutualFriends, friend: { friends, loading } }) => {
  useEffect(() => {
    getMutualFriends();
  }, [getMutualFriends]);

  const classes = useStyles();

  return (
    <Fragment>
      <Paper className={classes.paper}>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Typography variant="h3">Your friends(zone)</Typography>
            <Grid container spacing={3}>
              {friends.length > 0 ? (
                friends.map(profile => (
                  <ListItem className={classes.dialog}>
                    <Grid item xs key={profile._id}>
                      <FriendItem key={profile._id} profile={profile} />
                    </Grid>
                  </ListItem>
                ))
              ) : (
                <Grid>
                  <Typography variant="h4" className={classes.alone}>
                    You are forever alone..
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Fragment>
        )}
      </Paper>
    </Fragment>
  );
};

FriendItem.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  friend: state.friend
});

export default connect(
  mapStateToProps,
  { getMutualFriends }
)(Friends);
