import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience.js";
import ProfileEducation from "./ProfileEducation";
import { getProfileById } from "../../actions/profile";
import { getUserPosts } from "../../actions/post";
import PostItem from "../posts/PostItem";
import PostForm from "../posts/PostForm";

const Profile = ({
  getProfileById,
  getUserPosts,
  post: { posts },
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    getUserPosts(match.params.id);
  }, [match.params.id, getProfileById, getUserPosts]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to profiles
          </Link>
          {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === profile.user._id ? (
            <Link to="/edit-profile" className="btn btn-dark">
              {" "}
              Edit my profile
            </Link>
          ) : (
            ""
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />

            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience..</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education..</h4>
              )}
            </div>
          </div>

          <Fragment>
            {posts.length > 0
              ? posts.map(item => <PostItem key={item._id} post={item} />)
              : ""}
          </Fragment>
          <Fragment>
            {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id ? (
              <PostForm />
            ) : (
              ""
            )}
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getProfileById, getUserPosts }
)(Profile);
