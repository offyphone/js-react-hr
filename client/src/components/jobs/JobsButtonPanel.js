import React, { useState } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import { connect } from "react-redux";

import {
  getJobs,
  getYoursJobs,
  getFavorite,
  toggleFavorites
} from "../../actions/jobs";
import { Grid, Button, Checkbox } from "@material-ui/core";

const JobsButtonPanel = ({
  getJobs,
  getYoursJobs,
  IsOnlyFavorites,
  toggleFavorites
}) => {
  const [isShowedAllJobs, toggleJobShowing] = useState(false);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Button className="btn btn-info" variant="outlined">
            <Link to="/add-job">Add </Link>
          </Button>
        </Grid>

        <Grid item>
          <Button className="btn btn-info" variant="outlined">
            <Link to="/responses">Job responses </Link>
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Checkbox
            checked={isShowedAllJobs}
            onChange={e => {
              toggleJobShowing(!isShowedAllJobs);
              isShowedAllJobs ? getJobs() : getYoursJobs();
            }}
            value="checkedA"
            inputProps={{
              "aria-label": "primary checkbox"
            }}
          />
          Your Vacancies
        </Grid>

        <Grid item>
          <Checkbox
            checked={!IsOnlyFavorites}
            onChange={e => {
              toggleFavorites(IsOnlyFavorites);
            }}
            value="checkedA"
            inputProps={{
              "aria-label": "primary checkbox"
            }}
          />
          Favorites
        </Grid>
      </Grid>
    </Grid>
  );
};

JobsButtonPanel.propTypes = {
  toggleFavorites: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  jobs: state.job.jobs,
  favorites: state.job.favorites,
  IsOnlyFavorites: state.job.IsOnlyFavorites
});

export default connect(
  mapStateToProps,
  { getJobs, getYoursJobs, getFavorite, toggleFavorites }
)(JobsButtonPanel);
