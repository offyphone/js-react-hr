import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMutualFriends } from "../../actions/friend";
import FriendItem from "./FriendItem";

const Friends = ({ getMutualFriends, friend: { friends, loading } }) => {
  useEffect(() => {
    getMutualFriends();
  }, [getMutualFriends]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Friends</h1>

          <p className="lead">
            <i className="fab fa-connectdevelop" /> Your friend list(zone)
          </p>

          <div className="profiles">
            {friends.length > 0 ? (
              friends.map(profile => (
                <FriendItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>You are forever alone...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

FriendItem.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  friend: state.friend
});

export default connect(
  mapStateToProps,
  { getMutualFriends }
)(Friends);
