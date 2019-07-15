import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_JOBS,
  GET_JOB,
  POST_ERROR,
  GET_YOURS_JOBS,
  DELETE_JOB
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

export const getJobs = () => async dispatch => {
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
