import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getResponses } from "../../actions/jobs";
import ResponseItem from "./ResponseItem";
import Spinner from "../../components/layout/Spinner";

const Responses = ({ job: { loading, responses, job }, getResponses }) => {
  useState(() => {
    getResponses();
  }, [getResponses]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div>List of your offers:</div>
      {responses.map(item => (
        <ResponseItem job={item} key={item._id} />
      ))}
    </div>
  );
};

Responses.propTypes = {
  job: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  job: state.job
});

export default connect(
  mapStateToProps,
  { getResponses }
)(Responses);
