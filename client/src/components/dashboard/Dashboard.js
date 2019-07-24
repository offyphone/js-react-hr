import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { makeStyles } from "@material-ui/core/styles";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import ProfileJobs from "./ProfileJobs";
import { Grid, Button } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const useStyles = makeStyles(theme => ({
  buttonsBoard: {
    backgroundColor: "#f4f4f4",
    padding: theme.spacing(1, 0, 1, 3)
  }
}));

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <h1 className="large text-primary">Dashboard</h1>{" "}
      <Grid>
        <Grid item>
          <i className="fas fa-user" /> Welcome {user && user.name}
        </Grid>
        {profile !== null ? (
          <Fragment>
            <Grid className={classes.buttonsBoard}>
              <DashboardActions />
              <ProfileJobs />
            </Grid>

            <ExpansionPanel>
              <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h4>Experience</h4>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Experience experience={profile.experience} />
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h4>Education</h4>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Education education={profile.education} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h2>Delete My Account</h2>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails>
                <div className="my-2">
                  <Button
                    color="secondary"
                    variant="contained"
                    className="btn btn-danger "
                    onClick={() => deleteAccount()}
                  >
                    <i className="fas fa-user-minus" />
                    Yes, im sure. Delete My Account!
                  </Button>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
      </Grid>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
