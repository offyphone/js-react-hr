import axios from "axios";
import {
  GET_FRIENDS,
  REMOVE_FRIEND,
  SEND_FRIENDSHIP,
  POST_ERROR,
  GET_MUTUAL_FRIENDS,
  CLEAR_FRIENDS
} from "./types";

// Get Friendlist
export const getFriends = () => async dispatch => {
  dispatch({
    type: CLEAR_FRIENDS
  });
  try {
    const res = await axios.get(`/api/friends/`);
    dispatch({
      type: GET_FRIENDS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Profiles from mutual Friend
export const getMutualFriends = () => async dispatch => {
  dispatch({
    type: CLEAR_FRIENDS
  });
  try {
    const res = await axios.get(`/api/friends/mutual`);
    dispatch({
      type: GET_MUTUAL_FRIENDS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Send Friend's request
export const addFriends = id => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json"
      }
    };
    const res = await axios.put(`/api/friends/${id}`, null, config);

    dispatch({
      type: SEND_FRIENDSHIP,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove Friend
export const removeFriend = id => async dispatch => {
  try {
    //console.log(`/api/friends/${id}`);
    const res = await axios.delete(`/api/friends/${id}`);
    dispatch({
      type: REMOVE_FRIEND,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
