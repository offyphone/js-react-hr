import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../components/layout/Spinner";
import { getDialogs } from "../../actions/message";
import Dialog from "../../components/messages/Dialog";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";

const Dialogs = ({ getDialogs, dialog: { dialogs, loading } }) => {
  useEffect(() => {
    getDialogs();
  }, [getDialogs]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <CssBaseline />
      <Paper square>
        <List>
          {dialogs.map(dialog => (
            <Dialog key={dialog._id} dialog={dialog} id={dialog.id} />
          ))}
        </List>
      </Paper>
    </Fragment>
  );
};

Dialogs.propTypes = {
  getDialogs: PropTypes.func.isRequired,
  dialog: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  dialog: state.message
});

export default connect(
  mapStateToProps,
  { getDialogs }
)(Dialogs);
