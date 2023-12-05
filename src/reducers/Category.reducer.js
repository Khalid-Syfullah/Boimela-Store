import {
  DELETE_CATEGORY,
  GET_CATEGORY_DETAILS,
  GET_CATEGORY_LIST,
} from "../constants/Type";

const initialState = {
  category: null,
  selected_category: null,
  loading: true,
};

const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORY_LIST:
      return {
        ...state,
        category: payload,
        loading: false,
      };
    case GET_CATEGORY_DETAILS:
      return {
        ...state,
        selected_category: payload,
        loading: false,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        category: state.category.filter((category) => category._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
