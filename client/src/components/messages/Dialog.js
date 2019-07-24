import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const Dialog = ({ dialog, auth }) => {
  return (
    <React.Fragment>
      <Link to={`/dialogs/${dialog._id}`}>
        {dialog.user.map(user =>
          user.user._id !== auth.user._id ? (
            <p key={user.user._id}>{dialog.last.user.name}</p>
          ) : (
            ""
          )
        )}
        <ListItemAvatar>
          <Avatar alt="" src={dialog.last.user.avatar} />
        </ListItemAvatar>
        <ListSubheader>
          {dialog.last.user.name}Posted on{" "}
          <Moment format="YYYY/MM/DD mm:ss">{dialog.date}</Moment>
        </ListSubheader>
        <ListItemText>
          . . . {dialog.last !== undefined ? dialog.last.text : ""}
        </ListItemText>
      </Link>
      <hr />
    </React.Fragment>
  );
};

Dialog.propTypes = {
  dialog: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dialog);
