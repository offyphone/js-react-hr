import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getJobs, getFavorite, getResponses } from "../../actions/jobs";
import JobItem from "./JobItem";
import JobItemButtons from "./JobItemButtons";
import Spinner from "../layout/Spinner";
import JobsButtonPanel from "./JobsButtonPanel";
import { Typography } from "@material-ui/core";

const Jobs = ({
  auth,
  getJobs,
  job: { jobs, loading, favorites, IsOnlyFavorites, responses },
  getResponses
}) => {
  useEffect(() => {
    getJobs();
    getFavorite();
    getResponses();
  }, [getJobs, getResponses, loading]);

  return (
    <div>
      <Typography variant="h3">You can post any jobs for free!</Typography>
      {auth.isAuthenticated ? <JobsButtonPanel /> : ""}

      {loading ? (
        <Spinner />
      ) : jobs.length > 0 ? (
        jobs.map(job =>
          IsOnlyFavorites ? (
            <>
              <JobItemButtons job={job} key={job.title} />
              <JobItem job={job} key={job._id} />
            </>
          ) : favorites.includes(job._id) ? (
            <>
              <JobItemButtons job={job} key={job.title + 2} />
              <JobItem job={job} key={job._id + 2} />
            </>
          ) : (
            ""
          )
        )
      ) : (
        "There is no available job at current moment"
      )}
    </div>
  );
};

Jobs.propTypes = {
  getJobs: PropTypes.func.isRequired,
  getFavorite: PropTypes.func.isRequired,
  getResponses: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  job: state.job
});

export default connect(
  mapStateToProps,
  { getJobs, getFavorite, getResponses }
)(Jobs);
