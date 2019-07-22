import React from "react";
import PropTypes from "prop-types";

import JobItem from "../../components/jobs/JobItem";
import ResponseInfo from "./ResponseInfo";

const ResponseItem = ({ job }) => {
  return (
    <div>
      <JobItem job={job} />
      <ResponseInfo response={job.responses[0]} jobAuthor={job.user} />
      <hr />
    </div>
  );
};

ResponseItem.propTypes = {
  job: PropTypes.object.isRequired
};

export default ResponseItem;
