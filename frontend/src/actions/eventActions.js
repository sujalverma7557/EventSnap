import {
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL,
  EVENT_JOIN_REQUEST,
  EVENT_JOIN_SUCCESS,
  EVENT_JOIN_FAIL,
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,
} from '../constants/eventConstants';
import axios from 'axios';

const getAuthHeaders = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userInfo?.token}`,
  };
};

export const createEvent = (name, type) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_CREATE_REQUEST });

    const { data } = await axios.post(
      '/api/events',
      { name, type },
      { headers: getAuthHeaders() }
    );

    dispatch({
      type: EVENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const joinEvent = (inviteCode) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_JOIN_REQUEST });

    const { data } = await axios.post(
      '/api/events/join',
      { inviteCode },
      { headers: getAuthHeaders() }
    );

    dispatch({
      type: EVENT_JOIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_JOIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEvents = () => async (dispatch) => {
  try {
    dispatch({ type: EVENT_LIST_REQUEST });

    const { data } = await axios.get('/api/events', {
      headers: getAuthHeaders(),
    });

    dispatch({
      type: EVENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEventById = (eventId) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/events/${eventId}`, {
      headers: getAuthHeaders(),
    });

    dispatch({
      type: EVENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
