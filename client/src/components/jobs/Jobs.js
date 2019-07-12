import React, { useEffect } from "react";
import PropTypes from "prop-types";
import PostJob from "../jobs/PostJob";

import { connect } from "react-redux";
import { getJobs } from "../../actions/jobs";

const Jobs = ({ auth }) => {
  useEffect(() => {
    getJobs();
  }, [getJobs]);

  return (
    <div>
      You can post any jobs for free!
      {auth.isAuthenticated ? <PostJob> </PostJob> : ""}
    </div>
  );
};

Jobs.propTypes = {
  getJobs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  job: state.jobs
});

export default connect(
  mapStateToProps,
  { getJobs }
)(Jobs);
