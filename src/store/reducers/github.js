import {FETCH_AWARDS_SUCCESS, FETCH_ORGANIZATION_SUCCESS} from '../actions/github';

const initialState = {
  organization: null,
  awards: null
};

export default (state=initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case FETCH_ORGANIZATION_SUCCESS: {
      const {organization} = payload;
      return {...state, organization};
    }
    case FETCH_AWARDS_SUCCESS: {
      const {awards} = payload;
      return {...state, awards};
    }
    default:
      return state;
  }
};
