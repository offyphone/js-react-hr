import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getResponses } from "../../actions/jobs";

const ProfileJobs = ({ getResponses, responses }) => {
  useEffect(() => {
    getResponses();
  }, [getResponses]);

  return (
    <div>
      {responses !== null && responses.length > 0 ? (
        <Link to="/responses/pending" className="btn btn-white">
          <i className="fas fa-user-circle text-primary" /> Job responses{" "}
          {responses === null ? "" : `[${responses.length}]`}
        </Link>
      ) : (
        <button className="btn btn-dark">
          <i className="fas fa-user-circle text-primary" /> No job responses{" "}
        </button>
      )}

      {responses === null
        ? ""
        : `Accept: ${
            responses.map(item => item.responses).filter(a => a[0].accept)
              .length
          }, Decline: ${
            responses.map(item => item.responses).filter(d => d[0].decline)
              .length
          }`}
      <br />
    </div>
  );
};

ProfileJobs.propTypes = {
  getResponses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  responses: state.job.responses
});

export default connect(
  mapStateToProps,
  { getResponses }
)(ProfileJobs);
