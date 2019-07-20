import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { acceptResponse, declineResponse } from "../../actions/jobs";

import { connect } from "react-redux";

const JobResponse = ({ response, acceptResponse, declineResponse }) => {
  return (
    <div>
      <div>{response.profile.user.name}</div>
      <div>{response.profile.skills}</div>
      <p>
        <Link to={`/profile/${response.profile.user._id}`}>
          {response.profile.user.name}
        </Link>
      </p>
      <span>
        <button
          className="btn btn-green"
          onClick={e => {
            acceptResponse(response._id);
          }}
        >
          {response.accept ? "ACCEPTED" : "accept"}
        </button>
        <button
          className="btn btn-white"
          onClick={e => {
            declineResponse(response._id);
          }}
        >
          {response.decline ? "DECLINED" : "decline"}
        </button>
      </span>
    </div>
  );
};

JobResponse.propTypes = {
  response: PropTypes.object.isRequired
};

export default connect(
  null,
  { acceptResponse, declineResponse }
)(JobResponse);
