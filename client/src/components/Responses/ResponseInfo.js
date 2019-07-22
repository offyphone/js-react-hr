import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { withRouter } from "react-router-dom";

const ResponseInfo = ({ response, history, jobAuthor }) => {
  return (
    <div>
      <div
        onClick={async e => {
          const link = await axios.get(
            `/api/dialogs/get-or-create/${jobAuthor}`
          );
          await history.push(`/dialogs/${link.data._id}`);
        }}
        className="btn btn-primary"
      >
        Send PM to Vacancy creator
      </div>
      <br />
      {response.accept ? "ACCEPTED" : ""}
      {response.decline ? "DECLINED" : ""}
    </div>
  );
};

ResponseInfo.propTypes = {
  jobAuthor: PropTypes.string.isRequired,
  response: PropTypes.object.isRequired
};

export default withRouter(ResponseInfo);
