import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const JobItem = ({ job }) => {
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
    </div>
  );
};

JobItem.propTypes = {
  job: PropTypes.object.isRequired
};

export default JobItem;
