import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fas fa-users" />
          <span className="hide-sm"> Sufferers</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="far fa-comment-alt" />
          <span className="hide-sm"> Posts</span>
        </Link>
      </li>
      <li>
        <Link to="/dialogs">
          <i className="far fa-comment-alt" />
          <span className="hide-sm"> Private Messages </span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm"> Sufferboard</span>
        </Link>
      </li>
      <li>
        <Link to="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm"> logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fas fa-users" />
          <span className="hide-sm"> Sufferers</span>
        </Link>
      </li>
      <li>
        <i className="fas fa-registered" />
        <Link to="/register">Register</Link>
      </li>
      <li>
        <i className="fas fa-sign-in-alt" />
        <Link to="/login">Log In</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-tractor" /> Suffer[In]
        </Link>
      </h1>
      <ul>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
