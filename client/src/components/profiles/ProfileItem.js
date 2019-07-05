import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";

const ProfileItem = ({
  auth,
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
        {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === _id ? (
          ""
        ) : (
          <p>
            {" "}
            <br />
            <span>
              <Link to={`/dialogs/${_id}`} className="btn btn-primary">
                PM
              </Link>

              <Link to={`/friends/${_id}`} className="btn btn-primary">
                Connect
              </Link>
            </span>
          </p>
        )}
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li className="text-primary" key={skill.index}>
            <i className="fas fa-check" />
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
  {}
)(ProfileItem);
