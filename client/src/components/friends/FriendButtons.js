import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { addFriends } from "../../actions/friend";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

const FriendButtons = ({ id, history, addFriends }) => {
  return (
    <Fragment>
      <Button
        onClick={async e => {
          const link = await axios.get(`/api/dialogs/get-or-create/${id}`);
          await history.push(`/dialogs/${link.data._id}`);
        }}
        className="btn btn-primary"
      >
        PM
      </Button>

      <Button
        to={`/friends/${id}`}
        className="btn btn-primary"
        onClick={() => {
          addFriends(id);
        }}
      >
        Connect
      </Button>
    </Fragment>
  );
};

FriendButtons.propTypes = {
  id: PropTypes.string.isRequired
};

export default connect(
  null,
  { addFriends }
)(withRouter(FriendButtons));
