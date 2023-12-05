import {
  GET_BEST_SELLER,
  GET_NEW_BOOK,
  GET_PICKED,
  GET_POPULAR,
  GET_THIS_WEEK_BOOK,
} from "../constants/Type";

const initialState = {
  week: null,
  best: null,
  popular: null,
  picked: null,
  new: null,
  loading: true,
};

const landingReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_THIS_WEEK_BOOK:
      return {
        ...state,
        week: payload,
        loading: false,
      };
    case GET_BEST_SELLER:
      return {
        ...state,
        best: payload,
        loading: false,
      };
    case GET_PICKED:
      return {
        ...state,
        picked: payload,
        loading: false,
      };
    case GET_NEW_BOOK:
      return {
        ...state,
        new: payload,
        loading: false,
      };
    case GET_POPULAR:
      return {
        ...state,
        popular: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default landingReducer;
