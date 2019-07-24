import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  register: {
    margin: theme.spacing(0, 0, 1, 0)
  }
}));

const Register = ({ setAlert, register, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords doesn't match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment className={classes.root}>
      <Paper>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
        >
          <Typography variant="h4">Sign Up</Typography>
          <Typography variant="paragraph">
            <i className="fas fa-user" /> Create Your Account
          </Typography>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <Grid item>
              <TextField
                className={classes.register}
                variant="outlined"
                type="text"
                placeholder="Name"
                name="name"
                label="Name"
                value={name}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                className={classes.register}
                variant="outlined"
                type="email"
                placeholder="Email Address"
                label="Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid>
              <Typography variant="small" className={classes.register}>
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                className={classes.register}
                variant="outlined"
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                label="Password"
                value={password}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                className={classes.register}
                variant="outlined"
                type="password"
                placeholder="Confirm Password"
                name="password2"
                label="Confirm Password"
                minLength="6"
                value={password2}
                onChange={e => onChange(e)}
              />
            </Grid>
            <input type="submit" className="btn btn-primary" value="Register" />
          </form>
          <Typography>
            Already have an account? <Link to="/login">Sign In</Link>
          </Typography>
        </Grid>
      </Paper>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
