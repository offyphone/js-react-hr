import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";

const DashboardActions = () => {
  return (
    <Grid container spacing={2} justify="flex-start" alignItems="center">
      <Grid item>
        <Button className="btn btn-light">
          <Link to="/edit-profile">
            <i className="fas fa-user-circle text-primary" /> Edit Profile
          </Link>
        </Button>
      </Grid>
      <Grid item>
        <Button className="btn btn-light">
          <Link to="/add-experience">
            <i className="fab fa-black-tie text-primary" /> Add Experience
          </Link>
        </Button>
      </Grid>
      <Grid item>
        <Button className="btn btn-light">
          <Link to="/add-education">
            <i className="fas fa-graduation-cap text-primary" /> Add Education
          </Link>
        </Button>
      </Grid>
    </Grid>
  );
};

export default DashboardActions;
