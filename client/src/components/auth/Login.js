import React, { Fragment, useState } from "react";
import clsx from "clsx";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../../actions/auth";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
// TODO load icons
//import Visibility from '@material-ui/icons/Visibility';
//import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  title: {
    margin: theme.spacing(0, 0, 2, 0)
  },
  signIn: {
    margin: theme.spacing(3, 0, 1, 0)
  },
  textField: {
    flexBasis: 200
  },
  paper: {
    padding: theme.spacing(3, 2)
  }
}));

const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    // useful to debug
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="center">
          <Grid item>
            <Typography component="h3" variant="h3" className={classes.title}>
              Sign In
            </Typography>
          </Grid>
          <form className="form">
            <Grid item>
              <TextField
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                id="input-with-icon-grid"
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-adornment-password"
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                value={password}
                minLength="6"
                onChange={e => onChange(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        edge="end"
                        aria-label="Toggle password visibility"
                        onClick={e => {
                          setShowPassword(!showPassword);
                        }}>
                        {showPassword ? "Show" : "Hide"}
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                type="submit"
                className={classes.signIn}
                value="Login"
                onClick={e => {
                  onSubmit(e);
                }}>
                Sign In
              </Button>
            </Grid>
            <Grid item>
              <Typography component="p">
                <Typography component="small">
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email <br />
                  Don`t have an account? <Link to="/register">Sign Up</Link>
                </Typography>
              </Typography>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
