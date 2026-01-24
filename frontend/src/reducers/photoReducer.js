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

export const photoListReducer = (state = { photos: [] }, action) => {
  switch (action.type) {
    case PHOTO_LIST_REQUEST:
      return { loading: true, photos: [] };
    case PHOTO_LIST_SUCCESS:
      return {
        loading: false,
        photos: action.payload,
      };
    case PHOTO_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const photoCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PHOTO_CREATE_REQUEST:
      return { loading: true };
    case PHOTO_CREATE_SUCCESS:
      return { loading: false, success: true, photo: action.payload };
    case PHOTO_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const photoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PHOTO_DELETE_REQUEST:
      return { loading: true };
    case PHOTO_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PHOTO_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userPhotoListReducer = (
  state = { photos: [] },
  action
) => {
  switch (action.type) {
    case 'USER_PHOTOS_REQUEST':
      return { loading: true, photos: [] };

    case 'USER_PHOTOS_SUCCESS':
      return { loading: false, photos: action.payload };

    case 'USER_PHOTOS_FAIL':
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

