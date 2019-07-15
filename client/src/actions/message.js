import axios from "axios";
import { POST_ERROR, MESSAGE_SENT, GET_DIALOG, GET_DIALOGS } from "./types";

// Get messages by id

export const getDialog = id => async dispatch => {
  try {
    //console.log(`/api/dialogs/${id}`);
    const res = await axios.get(`/api/dialogs/${id}`);
    dispatch({
      type: GET_DIALOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Send message
export const addMessage = (dialogId, formData) => async dispatch => {
  // console.log(`TO: ${id} formData: ${formData.text}`);
  const config = {
    headers: {
      "Content-Type": "Application/json"
    }
  };

  try {
    const res = await axios.post(`/api/dialogs/${dialogId}`, formData, config);
    dispatch({
      type: MESSAGE_SENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Dialogs
export const getDialogs = () => async dispatch => {
  try {
    const res = await axios.get("/api/dialogs");
    dispatch({
      type: GET_DIALOGS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
