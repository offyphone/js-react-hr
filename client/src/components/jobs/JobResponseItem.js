import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import JobResponse from "./JobResponse";
import { connect } from "react-redux";

const JobResponseItem = ({ job }) => {
  return (
    <div>
      <div className="job bg-light">
        <h2>
          <Link to={`/jobs/${job._id}`}>{job.title}</Link>
        </h2>
        {job.salaryMin || job.salaryMax ? (
          <h4>
            <span>
              {job.salaryMin} - {job.salaryMax}
            </span>
          </h4>
        ) : (
          ""
        )}
        <p>{job.company}</p>

        {job.description ? (
          <div>
            <hr />
            <p>{job.description}</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <br />
      {job.responses !== undefined
        ? job.responses.map(response => (
            <JobResponse response={response} key={response._id} />
          ))
        : "No responses yet..."}
    </div>
  );
};

JobResponseItem.propTypes = {
  job: PropTypes.object.isRequired
};

export default connect(
  null,
  {}
)(JobResponseItem);
