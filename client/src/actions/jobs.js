import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_JOBS,
  GET_JOB,
  POST_ERROR,
  GET_YOURS_JOBS,
  DELETE_JOB,
  CLEAR_JOB,
  EDIT_JOB,
  GET_FAVORITE,
  SET_FAVORITE,
  GET_RESPONSES,
  PUT_RESPONSE,
  TOGGLE_FAVORITE
} from "./types";

export const createJob = (formData, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "Application/json"
    }
  };

  try {
    const res = await axios.post("/api/jobs", formData, config);
    dispatch({
      type: GET_JOB,
      payload: res.data
    });
    dispatch(setAlert("Vacancy have been created", "success"));
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const editJob = (id, formData, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "Application/json"
    }
  };

  try {
    const res = await axios.put(`/api/jobs/${id}`, formData, config);
    dispatch({
      type: EDIT_JOB,
      payload: res.data
    });
    dispatch(setAlert("Vacancy have been edited", "success"));
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getJobs = () => async dispatch => {
  dispatch({ type: CLEAR_JOB });
  try {
    const res = await axios.get("/api/jobs");
    dispatch({
      type: GET_JOBS,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const getJob = id => async dispatch => {
  // dispatch({ type: CLEAR_JOB });
  try {
    const res = await axios.get(`/api/jobs/${id}`);
    dispatch({
      type: GET_JOB,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteJob = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/jobs/${id}`);
    dispatch({
      type: DELETE_JOB,
      payload: res.data
    });
    dispatch(setAlert("Your vacancy has deleted", "error"));
  } catch (err) {
    console.error(err.message);
  }
};

export const getYoursJobs = () => async dispatch => {
  try {
    const res = await axios.get("/api/jobs/mine");
    dispatch({
      type: GET_YOURS_JOBS,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// set and unset in same function
export const setFavorite = id => async dispatch => {
  try {
    const res = await axios.put(`/api/jobs/favorite/${id}`);
    dispatch({
      type: SET_FAVORITE,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// set and unset in same function
export const getFavorite = () => async dispatch => {
  try {
    const res = await axios.get("/api/jobs/favorite/get/");
    dispatch({
      type: GET_FAVORITE,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// Switch favorites
export const toggleFavorites = bool => async dispatch => {
  try {
    dispatch({
      type: TOGGLE_FAVORITE,
      payload: bool
    });
  } catch (err) {
    console.error(err.message);
  }
};

// Responses block
export const getResponses = () => async dispatch => {
  try {
    const res = await axios.get("/api/jobs/response/all/");
    dispatch({
      type: GET_RESPONSES,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const putResponse = id => async dispatch => {
  try {
    const res = await axios.put(`/api/jobs/response/${id}`);
    dispatch({
      type: PUT_RESPONSE,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};
