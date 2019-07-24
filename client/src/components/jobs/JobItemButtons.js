import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";

import {
  deleteJob,
  getJob,
  setFavorite,
  putResponse
} from "../../actions/jobs";
import { Grid, Button } from "@material-ui/core";

const JobItemButtons = ({
  auth: { user, loading },
  favorites,
  responses,
  getResponses,
  history,
  putResponse,
  setFavorite,
  job,
  getJob,
  isAuthenticated,
  deleteJob
}) => {
  return !isAuthenticated ? (
    " "
  ) : (
    <Grid container direction="row" spacing={3} justify="space-evenly">
      {user._id !== job.user ? (
        <>
          <Grid item>
            <Checkbox
              checked={responses.map(e => e._id).includes(job._id)}
              onChange={e => {
                putResponse(job._id);
              }}
              value="checkedB"
              color="primary"
              inputProps={{
                "aria-label": "secondary checkbox"
              }}
            />
            {!responses.map(e => e._id).includes(job._id)
              ? "Send resume"
              : "Resume sent"}
          </Grid>
        </>
      ) : (
        ""
      )}
      <Grid item>
        <Checkbox
          checked={favorites.includes(job._id)}
          onChange={e => {
            setFavorite(job._id);
          }}
          value="checkedB"
          color="primary"
          inputProps={{
            "aria-label": "secondary checkbox"
          }}
        />
        Favorite
      </Grid>
      {user._id === job.user ? (
        <>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              className="btn btn-danger"
              onClick={e => {
                getJob(job._id);
                history.push(`/edit-job/${job._id}`);
              }}
            >
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              className="btn btn-danger"
              onClick={e => {
                deleteJob(job._id);
              }}
            >
              Delete
            </Button>
          </Grid>
        </>
      ) : (
        ""
      )}
    </Grid>
  );
};

JobItemButtons.propTypes = {
  deleteJob: PropTypes.func.isRequired,
  setFavorite: PropTypes.func.isRequired,
  putResponse: PropTypes.func.isRequired,
  getJob: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  favorites: state.job.favorites,
  isAuthenticated: state.auth.isAuthenticated,
  responses: state.job.responses
});

export default connect(
  mapStateToProps,
  { deleteJob, getJob, setFavorite, putResponse }
)(withRouter(JobItemButtons));
