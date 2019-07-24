/*import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <Button color="inherit">
        <Link to="/profiles">
          <i className="fas fa-users" />
          <span className="hide-sm"> Strangers</span>
        </Link>
      </Button>

      <Button color="inherit">
        <Link to="/friends">
          <i className="fas fa-users" />
          <span className="hide-sm"> Friends?!</span>
        </Link>
      </Button>

      <Button color="inherit">
        <Link to="/posts">
          <i className="far fa-comment-alt" />
          <span className="hide-sm"> Posts</span>
        </Link>
      </Button>

      <Button color="inherit">
        <Link to="/dialogs">
          <i className="far fa-comment-alt" />
          <span className="hide-sm"> Private Messages </span>
        </Link>
      </Button>

      <Button color="inherit">
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm"> Sufferboard</span>
        </Link>
      </Button>

      <Button color="inherit">
        <Link to="/jobs">
          <i className="fas fa-user" /> <span className="hide-sm"> Jobs</span>
        </Link>
      </Button>

      <Button color="inherit">
        <Link to="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm"> logout</span>
        </Link>
      </Button>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Button color="inherit">
        <Link to="/jobs">
          <i className="fas fa-user" /> <span className="hide-sm"> Jobs</span>
        </Link>
      </Button>

      <Button color="inherit">
        <Link to="/profiles">
          <i className="fas fa-users" />
          <span className="hide-sm"> Strangers</span>
        </Link>
      </Button>

      <Button color="inherit">
        <i className="fas fa-registered" />
        <Link to="/register">Register</Link>
      </Button>

      <Button color="inherit">
        <i className="fas fa-sign-in-alt" />
        <Link to="/login">Log In</Link>
      </Button>
    </Fragment>
  );
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="Menu">
          SufferMenu
        </IconButton>
        <Button color="inherit">
          <Link to="/">
            <i className="fas fa-tractor" /> Suffer[In]
          </Link>
        </Button>
        <ul>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </ul>
      </Toolbar>
    </AppBar>
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
*/
import clsx from "clsx";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid } from "@material-ui/core";

const drawerWidth = 240;

const authLinks = (
  <Fragment>
    <Grid item>
      <Button color="inherit">
        <Link to="/profiles">
          <i className="fas fa-users" />
          <span className="hide-sm"> Strangers</span>
        </Link>
      </Button>
    </Grid>
    <Grid item>
      <Button color="inherit">
        <Link to="/friends">
          <i className="fas fa-users" />
          <span className="hide-sm"> Friends?!</span>
        </Link>
      </Button>
    </Grid>
    <Grid item>
      <Button color="inherit">
        <Link to="/posts">
          <i className="far fa-comment-alt" />
          <span className="hide-sm"> Posts</span>
        </Link>
      </Button>
    </Grid>
    <Grid item>
      <Button color="inherit">
        <Link to="/dialogs">
          <i className="far fa-comment-alt" />
          <span className="hide-sm"> Private Messages </span>
        </Link>
      </Button>
    </Grid>
    <Grid item>
      <Button color="inherit">
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm"> Sufferboard</span>
        </Link>
      </Button>
    </Grid>
    <Grid item>
      <Button color="inherit">
        <Link to="/jobs">
          <i className="fas fa-user" /> <span className="hide-sm"> Jobs</span>
        </Link>
      </Button>
    </Grid>
    <Grid item>
      <Button color="inherit">
        <Link to="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm"> logout</span>
        </Link>
      </Button>
    </Grid>
  </Fragment>
);

const guestLinks = (
  <Fragment>
    <Grid item>
      <Button color="inherit">
        <Link to="/jobs">
          <i className="fas fa-user" /> <span className="hide-sm"> Jobs</span>
        </Link>
      </Button>
    </Grid>
    <Grid item>
      <Button color="inherit">
        <Link to="/profiles">
          <i className="fas fa-users" />
          <span className="hide-sm"> Strangers</span>
        </Link>
      </Button>
    </Grid>
    <Grid item>
      <Button color="inherit">
        <i className="fas fa-registered" />
        <Link to="/register">Register</Link>
      </Button>
    </Grid>
    <Grid item>
      <Button color="inherit">
        <i className="fas fa-sign-in-alt" />
        <Link to="/login">Log In</Link>
      </Button>
    </Grid>
  </Fragment>
);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <Button
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            IconMenu
          </Button>
          <Typography variant="h6" noWrap>
            Suffer[in]
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? "<" : ">"}
          </IconButton>
        </div>
        <Divider />
        <Grid container direction="column">
          <Grid item>
            <Button color="inherit">
              <Link to="/">
                <i className="fas fa-tractor" /> Suffer[In]
              </Link>
            </Button>
          </Grid>
          <ul>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </ul>
        </Grid>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
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
