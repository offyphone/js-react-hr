import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "../../components/profiles/ProfileItem";
import Grid from "@material-ui/core/Grid";
import { Typography, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  paper: {
    minHeight: 360
  },
  alone: {
    textAlign: "right"
  }
});

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Typography variant="h2">Strangers</Typography>
          <Grid container spacing={3}>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <Grid item xs key={profile._id}>
                  <ProfileItem key={profile._id} profile={profile} />
                </Grid>
              ))
            ) : (
              <Grid>
                <Typography variant="h4" className={classes.alone}>
                  No profiles found...
                </Typography>
              </Grid>
            )}
          </Grid>
        </Fragment>
      )}
    </Paper>
  );
};
// <ProfileItem key={profile._id} profile={profile} />

Profiles.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
