import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";
import FriendButtons from "../../components/friends/FriendButtons";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

const ProfileItem = ({ auth, profile, history }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className="round-img"
          image={profile.user.avatar}
          title={profile.user.name}
        />
        <CardContent>
          {profile.status}
          {profile.company && (
            <Typography component="span"> at {profile.company} </Typography>
          )}
          {profile.location && (
            <Typography component="small" color="textSecondary">
              {profile.location}
            </Typography>
          )}
        </CardContent>
        <hr />
      </CardActionArea>
      <CardActions>
        <Button
          onClick={e => {
            history.push(`/profile/${profile.user._id}`);
          }}
        >
          View Profile
        </Button>
        {auth.user !== null ? (
          profile !== null &&
          auth.loading &&
          auth.user._id === profile.user._id ? (
            <Spinner />
          ) : (
            <div>
              {" "}
              {auth.user._id !== profile.user._id ? (
                <FriendButtons id={profile.user._id} />
              ) : (
                ""
              )}
            </div>
          )
        ) : (
          ""
        )}
        <Button
          onClick={e => {
            setExpanded(!expanded);
          }}
        >
          Skills
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <ul>
          {profile.skills.slice(0, 4).map((skill, index) => (
            <li className="text-primary" key={index * 8}>
              <i className="fas fa-check" key={index * 4} />
              <Typography paragraph>{skill}</Typography>
            </li>
          ))}
        </ul>
      </Collapse>
    </Card>
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
)(withRouter(ProfileItem));
