import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Dialog = ({ dialog }) => {
  return (
    <Link to={`/dialogs/${dialog._id}`}>
      <div className="post bg-white p-1 my-1">
        <div />
        <div>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{dialog.date}</Moment>
          </p>
          <p className="my-1">. . . {dialog.last}</p>
        </div>
      </div>
    </Link>
  );
};

Dialog.propTypes = {
  dialog: PropTypes.object.isRequired
};

export default connect()(Dialog);
