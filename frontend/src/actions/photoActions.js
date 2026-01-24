import {
  PHOTO_LIST_FAIL,
  PHOTO_LIST_REQUEST,
  PHOTO_LIST_SUCCESS,
  PHOTO_CREATE_FAIL,
  PHOTO_CREATE_REQUEST,
  PHOTO_CREATE_SUCCESS,
  PHOTO_DELETE_FAIL,
  PHOTO_DELETE_REQUEST,
  PHOTO_DELETE_SUCCESS,
} from '../constants/photoConstants';
import axios from 'axios';

const getAuthHeaders = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userInfo?.token}`,
  };
};

export const getPhotosByEvent = (eventId) => async (dispatch) => {
  try {
    dispatch({ type: PHOTO_LIST_REQUEST });

    const { data } = await axios.get(`/api/events/${eventId}/photos`, {
      headers: getAuthHeaders(),
    });

    dispatch({
      type: PHOTO_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PHOTO_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPhoto = (eventId, image, blurhash, caption) => async (dispatch) => {
  try {
    dispatch({
      type: PHOTO_CREATE_REQUEST,
    });

    const { data } = await axios.post(
      '/api/photos',
      { eventId, image, blurhash, caption },
      { headers: getAuthHeaders() }
    );

    dispatch({
      type: PHOTO_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PHOTO_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPhotosByUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_PHOTOS_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/photos/user/${userId}`, config);

    dispatch({
      type: 'USER_PHOTOS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'USER_PHOTOS_FAIL',
      payload:
        error.response?.data.message || error.message,
    });
  }
};


export const deletePhoto = (photoId) => async (dispatch) => {
  try {
    dispatch({
      type: PHOTO_DELETE_REQUEST,
    });

    await axios.delete(`/api/photos/${photoId}`, {
      headers: getAuthHeaders(),
    });

    dispatch({
      type: PHOTO_DELETE_SUCCESS,
      payload: photoId,
    });
  } catch (error) {
    dispatch({
      type: PHOTO_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
