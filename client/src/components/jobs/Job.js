import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import JobItemButtons from "./JobItemButtons";
import { getJob } from "../../actions/jobs";

const Job = ({ job: { job, loading }, getJob, match }) => {
  useEffect(() => {
    getJob(match.params.id);
  }, [getJob, match.params.id]);
  return job === null ? (
    "im loading"
  ) : (
    <>
      <JobItemButtons job={job} />
      <div> {job.company}</div>
      <div>{job.title}</div>
      <div>
        {job.salaryMin} -{job.salaryMax}{" "}
      </div>
      <div>{job.description}</div>
      <div>{job.reqs}</div>
      <div>{job.special}</div>{" "}
    </>
  );
};

Job.propTypes = {
  getJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  job: state.job
});

export default connect(
  mapStateToProps,
  { getJob }
)(Job);
