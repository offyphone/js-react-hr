import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { removeFriend } from "../../actions/friend";

const FriendItem = ({
  auth,
  history,
  friend: { friendsLoading, friends },
  removeFriend,
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
        {auth.user !== null &&
        auth.loading !== false &&
        friendsLoading === false &&
        auth.user._id === _id ? (
          ""
        ) : (
          <div>
            {" "}
            <br />
            <span>
              <div
                onClick={async e => {
                  const link = await axios.get(
                    `/api/dialogs/get-or-create/${_id}`
                  );
                  await history.push(`/dialogs/${link.data._id}`);
                }}
                className="btn btn-primary"
              >
                PM
              </div>

              {auth.user._id === _id ? (
                ""
              ) : (
                <div
                  className="btn btn-primary"
                  onClick={e => removeFriend(_id)}
                >
                  Remove from friends
                </div>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

FriendItem.propTypes = {
  profile: PropTypes.object.isRequired,
  removeFriend: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  friend: state.friend
});

export default connect(
  mapStateToProps,
  { removeFriend }
)(withRouter(FriendItem));
