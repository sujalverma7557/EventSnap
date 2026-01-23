import { 
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_EDIT_PROFILE_FAIL,
    USER_EDIT_PROFILE_REQUEST,
    USER_EDIT_PROFILE_SUCCESS
 } from "../constants/userConstants";

 import axios from "axios";

 export const listUsers = () => async (
    dispatch
  ) => {
    try {
      dispatch({ type: USER_LIST_REQUEST});
  
      const { data } = await axios.get( `/api/products/users`);
  
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
  
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    window.location.href = "/"; 
    window.location.replace("/");
  };

  export const register = (name, email, password,occupation,about,contact_no,uploadedImage) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/users/signUp",
        { name, email, password,occupation,about,contact_no,uploadedImage},
        config
      );
  
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
  
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const editProfile = (name, email, password,occupation,about,contact_no,uploadedImage) => async (dispatch) => {
    try {
      dispatch({
        type: USER_EDIT_PROFILE_REQUEST,
      });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.put(
        "/api/users/profile",
        { name, email, password,occupation,about,contact_no,uploadedImage},
        config
      );
  
      dispatch({
        type: USER_EDIT_PROFILE_SUCCESS,
        payload: data,
      });
  
      dispatch({
        type: USER_EDIT_PROFILE_SUCCESS,
        payload: data,
      });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_EDIT_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };