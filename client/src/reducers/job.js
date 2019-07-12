import { GET_JOBS } from '../actions/types'

const initialState = {
    jobs: [],
    job: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_JOBS:
            return {
                jobs: [],
                loading: true
            };
        default:
            return state;
    }
}
