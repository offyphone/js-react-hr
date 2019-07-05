import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import Moment from "react-moment";
import PostMessage from "../../components/messages/PostMessage";
import Spinner from "../../components/layout/Spinner";
import { getDialog } from "../../actions/message";

const Messages = ({
  getDialog,
  messageState: {
    dialog: { to, messages },
    loadingDialog
  },
  match,
  auth
}) => {
  useEffect(() => {
    getDialog(match.params.id);
  }, [getDialog, match.params.id]);

  return loadingDialog ? (
    <Spinner />
  ) : (
    <div>
      {/* */}
      {messages.map(message => (
        <Fragment key={"fragment" + message._id}>
          <div
            key={message._id}
            className={
              auth.user._id === message.to
                ? "right-text my-1"
                : "left-text my-1"
            }
          >
            {" "}
            <h5 className="post-date">
              <Moment key={"moment" + message._id} format="YYYY/MM/DD">
                {message.date}
              </Moment>
            </h5>
            {"      "}
            {message.text}
          </div>
        </Fragment>
      ))}
      <PostMessage userIdTo={to} dialogId={match.params.id} />
    </div>
  );
};

Messages.propTypes = {
  getDialog: PropTypes.func.isRequired,
  messageState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  messageState: state.message,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getDialog }
)(Messages);
