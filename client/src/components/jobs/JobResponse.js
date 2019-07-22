import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { acceptResponse, declineResponse } from "../../actions/jobs";

import { connect } from "react-redux";

const JobResponse = ({ response, acceptResponse, declineResponse }) => {
  const [accept, setAccept] = useState(response.accept);
  const [decline, setDecline] = useState(response.decline);

  return (
    <div>
      <div>{response.profile.user.name}</div>
      <div>{response.profile.skills.join(", ")}</div>
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
            setAccept(true);
            setDecline(false);
          }}
        >
          {accept === true ? "ACCEPTED" : "accept"}
        </button>
        <button
          className="btn btn-white"
          onClick={e => {
            declineResponse(response._id);
            setAccept(false);
            setDecline(true);
          }}
        >
          {decline === true ? "DECLINED" : "decline"}
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
