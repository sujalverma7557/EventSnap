import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
} from "../constants/productConstants";

import axios from "axios";

 export const listProducts = () => async (
    dispatch
  ) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST});
  
      const { data } = await axios.get( `/api/products/photostream`);
  
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const createProduct = (title, author, caption, category,image,  gear, blurhash ) => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { product } = await axios.post(
        "/api/products/userProfile",
        { title, author, caption, category,image,  gear, blurhash},
        config
      );
  
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: product,
      });

      localStorage.setItem("product", JSON.stringify(product));
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };