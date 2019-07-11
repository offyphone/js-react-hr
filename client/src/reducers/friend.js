import {
  GET_FRIENDS,
  SEND_FRIENDSHIP,
  REMOVE_FRIEND,
  GET_MUTUAL_FRIENDS,
  CLEAR_FRIENDS
} from "../actions/types";

const initialState = {
  friends: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CLEAR_FRIENDS:
      return {
        friends: [],
        loading: true
      };
    case GET_MUTUAL_FRIENDS:
    case GET_FRIENDS:
    case SEND_FRIENDSHIP:
      return {
        friends: payload,
        loading: false
      };
    case REMOVE_FRIEND:
      return {
        friends: payload,
        loading: false
      };
    default:
      return state;
  }
}
