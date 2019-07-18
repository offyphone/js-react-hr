import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteJob,
  getJob,
  setFavorite,
  putResponse
} from "../../actions/jobs";

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
    <div className="bg-white ">
      <span>
        {user._id !== job.user ? (
          <>
            <button
              className={
                responses.map(e => e._id).includes(job._id)
                  ? "btn btn-white"
                  : "btn btn-blue"
              }
              onClick={e => {
                putResponse(job._id);
              }}
            >
              {responses.map(e => e._id).includes(job._id)
                ? "Response sent"
                : "Response"}
            </button>
          </>
        ) : (
          ""
        )}

        <button
          className={
            !favorites.includes(job._id) ? "btn btn-black" : "btn btn-white"
          }
          onClick={e => {
            setFavorite(job._id);
          }}
        >
          {!favorites.includes(job._id) ? "Favorite" : "Del from Favorites"}
        </button>
        {user._id === job.user ? (
          <>
            <button
              className="btn btn-danger"
              onClick={e => {
                getJob(job._id);
                history.push(`/edit-job/${job._id}`);
              }}
            >
              Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={e => {
                deleteJob(job._id);
              }}
            >
              Delete
            </button>
          </>
        ) : (
          ""
        )}
      </span>
    </div>
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
