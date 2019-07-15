import React, { useState } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getJobs, getYoursJobs } from "../../actions/jobs";

const JobsButtonPanel = ({ getJobs, getYoursJobs }) => {
  let [isShowedAllJobs, toggleJobShowing] = useState(false);

  return (
    <div>
      <span>
        <button className="btn btn-info">
          <Link to="/add-job">Post a new vacancy </Link>
        </button>
        <button
          type="button"
          className="btn btn-info"
          onClick={e => {
            toggleJobShowing(!isShowedAllJobs);
            isShowedAllJobs ? getJobs() : getYoursJobs();
          }}
        >
          Show {!isShowedAllJobs ? "only mine" : "all"} vacancies{" "}
        </button>{" "}
        <button className="btn btn-black">Favourites</button>
      </span>
    </div>
  );
};

JobsButtonPanel.propTypes = {};

export default connect(
  null,
  { getJobs, getYoursJobs }
)(JobsButtonPanel);
