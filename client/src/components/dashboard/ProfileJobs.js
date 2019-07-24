import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getResponses } from "../../actions/jobs";
import { Grid, Button } from "@material-ui/core";

const ProfileJobs = ({ getResponses, responses }) => {
  useEffect(() => {
    getResponses();
  }, [getResponses]);

  return (
    <Grid container spacing={2} justify="flex-start" alignItems="center">
      <Grid item>
        {responses !== null && responses.length > 0 ? (
          <Button className="btn btn-white">
            <Link to="/responses/pending">
              <i className="fas fa-user-circle text-primary" /> Job responses{" "}
              {responses === null ? "" : `[${responses.length}]`}
            </Link>
          </Button>
        ) : (
          <Button className="btn btn-dark">
            <i className="fas fa-user-circle text-primary" /> No job responses{" "}
          </Button>
        )}
      </Grid>
      <Grid item>
        {responses === null
          ? ""
          : `Accept: ${
              responses.map(item => item.responses).filter(a => a[0].accept)
                .length
            }, Decline: ${
              responses.map(item => item.responses).filter(d => d[0].decline)
                .length
            }`}
      </Grid>
    </Grid>
  );
};

ProfileJobs.propTypes = {
  getResponses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  responses: state.job.responses
});

export default connect(
  mapStateToProps,
  { getResponses }
)(ProfileJobs);
