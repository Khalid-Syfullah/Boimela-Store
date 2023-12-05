import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  AUTH_USER_LOAD,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_ERROR,
  GET_DASHBOARD_DATA,
} from "../constants/Type";
import jwt_decode from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token_book") || "",
  isAuthenticated: false,
  user: null,
  dashboard: null,
  loading: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      return {
        ...state,
        dashboard: action.payload,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_USER_LOAD:
      var decoded = jwt_decode(state.token.replace("Bearer ", ""));
      return {
        ...state,
        user: { ...action.payload, role: decoded?.role },
        loading: false,
      };
    case ACCESS_TOKEN_ERROR:
      return {
        ...state,
        err: action.payload,
        isAuthenticated: false,
        loading: false,
      };

    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token_book");
      return {
        ...state,
        token: "",
        user: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
