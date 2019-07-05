import {
  MESSAGE_SENT,
  GET_DIALOG,
  POST_ERROR,
  GET_DIALOGS
} from "./../actions/types";

const initialState = {
  dialogs: [],
  dialog: [],
  loading: true,
  loadingDialog: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DIALOGS:
      return {
        ...state,
        dialogs: payload,
        loading: false
      };
    case GET_DIALOG:
      return {
        ...state,
        dialog: payload,
        loadingDialog: false,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case MESSAGE_SENT:
      return {
        ...state,
        dialog: payload,
        loading: false,
        loadingDialog: false
      };
    default:
      return state;
  }
}
