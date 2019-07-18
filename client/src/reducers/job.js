import {
  GET_JOBS,
  GET_YOURS_JOBS,
  GET_JOB,
  DELETE_JOB,
  CLEAR_JOB,
  GET_FAVORITE,
  SET_FAVORITE,
  GET_RESPONSES,
  PUT_RESPONSE,
  TOGGLE_FAVORITE
} from "../actions/types";

const initialState = {
  jobs: [],
  jobs_tmp: [],
  job: null,
  IsOnlyFavorites: true,
  responses: [],
  loading: true,
  error: {},
  favorites: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_FAVORITE:
      return {
        ...state,
        IsOnlyFavorites: !payload
      };
    case GET_RESPONSES:
      return {
        ...state,
        responses: payload
      };
    case PUT_RESPONSE:
      return {
        ...state,
        responses:
          payload.setOrUnset === true
            ? [...state.responses, payload.job]
            : state.responses.filter(e => e._id !== payload.job._id)
      };
    case SET_FAVORITE:
      return {
        ...state,
        favorites:
          payload.type === true
            ? [...state.favorites, payload.job]
            : state.favorites.filter(e => e !== payload.job)
      };
    case GET_FAVORITE:
      console.log(payload.map(e => e._id));
      return {
        ...state,
        favorites: payload.map(e => e._id)
      };
    case CLEAR_JOB:
      return {
        ...state,
        job: null
      };
    case GET_JOBS:
      return {
        ...state,
        jobs: payload,
        loading: false,
        yours: false
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(job => job._id !== payload._id),
        loading: false
      };
    case GET_JOB:
      return {
        ...state,
        job: payload,
        loading: false
      };
    case GET_YOURS_JOBS: {
      return {
        ...state,
        jobs: payload,
        loading: false,
        yours: true
      };
    }
    default:
      return state;
  }
}
