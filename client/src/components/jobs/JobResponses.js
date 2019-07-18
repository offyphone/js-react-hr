import React, { useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getResponses } from "../../actions/jobs";

const JobResponses = ({ responses, getResponses }) => {
  useState(() => {
    getResponses();
  }, [getResponses]);

  return <div>There is job responses</div>;
};

JobResponses.propTypes = {
  getResponses: PropTypes.func.isRequired,
  responses: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  responses: state.job.responses
});

export default connect(
  mapStateToProps,
  {}
)(JobResponses);
