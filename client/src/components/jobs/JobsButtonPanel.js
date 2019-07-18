import React, { useState } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  getJobs,
  getYoursJobs,
  getFavorite,
  toggleFavorites
} from "../../actions/jobs";

const JobsButtonPanel = ({
  getJobs,
  getYoursJobs,
  IsOnlyFavorites,
  toggleFavorites
}) => {
  const [isShowedAllJobs, toggleJobShowing] = useState(false);

  return (
    <div className="bg-white">
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
        <button
          className={!IsOnlyFavorites ? "btn btn-white" : "btn btn-black"}
          onClick={e => {
            toggleFavorites(IsOnlyFavorites);
          }}
        >
          {!IsOnlyFavorites ? "Favorites!" : "Show only favorites"}
        </button>
        <button className="btn btn-info">
          <Link to="/responses">Get responses on your vacancies </Link>
        </button>
      </span>
    </div>
  );
};

JobsButtonPanel.propTypes = {
  toggleFavorites: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  jobs: state.job.jobs,
  favorites: state.job.favorites,
  IsOnlyFavorites: state.job.IsOnlyFavorites
});

export default connect(
  mapStateToProps,
  { getJobs, getYoursJobs, getFavorite, toggleFavorites }
)(JobsButtonPanel);
