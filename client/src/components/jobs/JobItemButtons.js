import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteJob } from "../../actions/jobs";

const JobItemButtons = ({
  auth: { user, loading },
  job,
  isAuthenticated,
  deleteJob
}) => {
  return !isAuthenticated ? (
    " "
  ) : (
    <div>
      <span>
        <button className="btn btn-success">Response </button>
        <button className="btn btn-black">Favourite</button>
        {user._id === job.user ? (
          <>
            <Link to={`/edit-job/${job._id}`} className="btn btn-white">
              Edit
            </Link>
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
  auth: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { deleteJob }
)(JobItemButtons);
