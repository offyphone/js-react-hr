import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Dialog = ({ dialog, auth }) => {
  return (
    <Link to={`/dialogs/${dialog._id}`}>
      <div className="post bg-white p-1 my-1">
        <div />
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  {dialog.user.map(user =>
                    user.user._id !== auth.user._id ? (
                      <p key={user.user._id}>{user.user.name}</p>
                    ) : (
                      ""
                    )
                  )}
                </th>
                <th>
                  {" "}
                  <p className="post-date">
                    Posted on <Moment format="YYYY/MM/DD">{dialog.date}</Moment>
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td>
                  <p className="my-1">. . . {dialog.last.text}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Link>
  );
};

Dialog.propTypes = {
  dialog: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dialog);
