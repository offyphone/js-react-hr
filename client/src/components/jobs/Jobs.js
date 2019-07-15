import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getJobs } from "../../actions/jobs";
import JobItem from "./JobItem";
import JobItemButtons from "./JobItemButtons";
import Spinner from "../layout/Spinner";
import JobsButtonPanel from "./JobsButtonPanel";

const Jobs = ({ auth, getJobs, job: { jobs, loading } }) => {
  useEffect(() => {
    getJobs();
  }, [getJobs]);

  return (
    <div>
      <h3 className="large text-primary">You can post any jobs for free!</h3>
      {auth.isAuthenticated ? <JobsButtonPanel /> : ""}

      {loading ? (
        <Spinner />
      ) : jobs.length > 0 ? (
        jobs.map(job => (
          <>
            <JobItemButtons job={job} />
            <JobItem job={job} key={job._id} />
          </>
        ))
      ) : (
        "There is no available job at current moment"
      )}
    </div>
  );
};

Jobs.propTypes = {
  getJobs: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  job: state.job
});

export default connect(
  mapStateToProps,
  { getJobs }
)(Jobs);
