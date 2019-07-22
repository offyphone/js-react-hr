import React, { useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getYoursJobs } from "../../actions/jobs";

import JobResponseItem from "./JobResponseItem";

const JobResponses = ({ job: { jobs, loading }, getYoursJobs }) => {
  useState(() => {
    getYoursJobs();
  }, [getYoursJobs, jobs]);

  return loading || jobs === null
    ? "SPINNER"
    : jobs.length === 0
    ? "On your jobs nobody have not sent responses"
    : jobs.map(e => <JobResponseItem job={e} key={e._id} />);
};

JobResponses.propTypes = {
  getYoursJobs: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  job: state.job
});

export default connect(
  mapStateToProps,
  { getYoursJobs }
)(JobResponses);
