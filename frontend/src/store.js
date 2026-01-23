import {createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { listUsersReducer,userEditProfileReducer,userLoginReducer, userRegisterReducer } from "./reducers/userReducer";
import { listProductsReducer,createProductReducer } from "./reducers/productReducer";


const reducer = combineReducers({
  listUsers: listUsersReducer,
  listProducts: listProductsReducer,
  userLogin: userLoginReducer,
  register: userRegisterReducer,
  createProduct: createProductReducer,
  editProfile:userEditProfileReducer
})

const initialState = {
}

const middleware = [thunk]

const store  = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;
