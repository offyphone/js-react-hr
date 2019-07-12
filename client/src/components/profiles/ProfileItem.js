import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Spinner from "../layout/Spinner";
import FriendButtons from "../../components/friends/FriendButtons";

const ProfileItem = ({ auth, profile }) => {
  return (
    <div className="profile bg-light">
      <img src={profile.user.avatar} alt="" className="round-img" />
      <div>
        <h2>{profile.user.name}</h2>
        <p>
          {profile.status}{" "}
          {profile.company && <span> at {profile.company}</span>}
        </p>
        <p className="my-1">
          {profile.location && <span>{profile.location}</span>}
        </p>
        <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
          View Profile
        </Link>
        {auth.user !== null &&
        profile !== null &&
        auth.loading &&
        auth.user._id === profile.user._id ? (
          <Spinner />
        ) : (
          <div>
            {" "}
            <br />
            <span>
              {auth.user._id !== profile.user._id ? (
                <FriendButtons id={profile.user._id} />
              ) : (
                ""
              )}
            </span>
          </div>
        )}
      </div>
      <ul>
        {profile.skills.slice(0, 4).map((skill, index) => (
          <li className="text-primary" key={index * 8}>
            <i className="fas fa-check" key={index * 4} />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(ProfileItem);
