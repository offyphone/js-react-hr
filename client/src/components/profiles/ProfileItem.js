import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";

const ProfileItem = ({
  auth,
  history,
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

              <Link to={`/friends/${_id}`} className="btn btn-primary">
                Connect
              </Link>
            </span>
          </div>
        )}
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li className="text-primary" key={skill.index}>
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
  {}
)(withRouter(ProfileItem));
