import axios from "axios";
import {
  GET_BEST_SELLER,
  GET_NEW_BOOK,
  GET_PICKED,
  GET_POPULAR,
  GET_THIS_WEEK_BOOK,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import { getRefreshToken } from "./Dashboard.action";

//GET collection DETAILS
export const getThisWeekBook = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/collection/week`);
    dispatch({
      type: GET_THIS_WEEK_BOOK,
      payload: res.data.collection,
    });
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(getThisWeekBook());
    } else {
      console.log(err);
    }
  }
};

//GET collection DETAILS
export const getTOurPickedBook = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/collection/selective`);
    dispatch({
      type: GET_PICKED,
      payload: res.data.collection,
    });
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(getTOurPickedBook());
    } else {
      console.log(err);
    }
  }
};

//GET collection DETAILS
export const getNewArrivalBook = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/collection/selective`);
    dispatch({
      type: GET_NEW_BOOK,
      payload: res.data.collection,
    });
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(getNewArrivalBook());
    } else {
      console.log(err);
    }
  }
};
//GET collection DETAILS
export const getBestSellerBook = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/collection/bestSeller`);
    dispatch({
      type: GET_BEST_SELLER,
      payload: res.data.collection,
    });
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(getBestSellerBook());
    } else {
      console.log(err);
    }
  }
};
//GET collection DETAILS
export const getPopularBook = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/collection/popular`);
    dispatch({
      type: GET_POPULAR,
      payload: res.data.collection,
    });
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(getPopularBook());
    } else {
      console.log(err);
    }
  }
};
