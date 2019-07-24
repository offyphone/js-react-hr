import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { removeFriend } from "../../actions/friend";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import { Avatar, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

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
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia>
        <Grid container direction="row">
          <Grid container direction="column">
            <Grid item xs={6}>
              <Avatar img={avatar} alt="" className="round-img" />
            </Grid>
            <Grid item xs={6}>
              <h2>{name}</h2>
            </Grid>
          </Grid>

          <Grid container direction="column">
            <Grid item xs={12}>
              <p>
                {status} {company && <span> at {company}</span>}
              </p>
            </Grid>
            <Grid item xs={12}>
              <p className="my-1">{location && <span>{location}</span>}</p>
            </Grid>
          </Grid>
        </Grid>
        <hr />
        <CardActions>
          <Button>
            <Link to={`/profile/${_id}`}>View Profile</Link>
          </Button>
          {auth.user !== null &&
          auth.loading !== false &&
          friendsLoading === false &&
          auth.user._id === _id ? (
            ""
          ) : (
            <>
              <Button
                onClick={async e => {
                  const link = await axios.get(
                    `/api/dialogs/get-or-create/${_id}`
                  );
                  await history.push(`/dialogs/${link.data._id}`);
                }}
                className="btn btn-primary"
              >
                PM
              </Button>

              {auth.user._id === _id ? (
                ""
              ) : (
                <Button
                  className="btn btn-primary"
                  onClick={e => removeFriend(_id)}
                >
                  Remove from friends
                </Button>
              )}
            </>
          )}
        </CardActions>
      </CardMedia>
    </Card>
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
