import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addMessage } from "../../actions/message";

const PostMessage = ({ addMessage, dialogId }) => {
  const [text, setText] = useState("");

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Send a private message</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addMessage(dialogId, { text });
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Send a private message"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostMessage.propTypes = {
  addMessage: PropTypes.func.isRequired,
  dialogId: PropTypes.string.isRequired
};

export default connect(
  null,
  { addMessage }
)(PostMessage);
