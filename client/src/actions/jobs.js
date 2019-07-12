import axios from "axios";

import { GET_JOBS, DELETE_JOB, EDIT_JOB, GET_JOB, POST_ERROR } from './types'

export const createJob = (formData,
  history) => async dispatch => {
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
    } catch (err) {
      console.error(err.message)
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }

export const getJobs = () => async dispatch => {
  try {
    const res = await axios.get("/api/jobs");
    dispatch({
      type: GET_JOBS,
      payload: res.data
    });
    console.log(res.data)
  } catch (err) {
    console.error(err.message)
  }

}