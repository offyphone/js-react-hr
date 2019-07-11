import React from "react";
import PropTypes from "prop-types";
import PostJob from "../jobs/PostJob";

import { connect } from "react-redux";

const Jobs = ({ auth }) => {
  return (
    <div>
      You can post any jobs for free!
      {auth.isAuthenticated ? <PostJob> </PostJob> : ""}
    </div>
  );
};

Jobs.propTypes = {};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Jobs);
