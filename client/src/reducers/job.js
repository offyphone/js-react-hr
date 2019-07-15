import {
  GET_JOBS,
  GET_YOURS_JOBS,
  GET_JOB,
  DELETE_JOB
} from "../actions/types";

const initialState = {
  jobs: [],
  job: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
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
