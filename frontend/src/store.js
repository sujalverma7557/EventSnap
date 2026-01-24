import {createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { listUsersReducer,userEditProfileReducer,userLoginReducer, userRegisterReducer } from "./reducers/userReducer";
import { photoListReducer, photoCreateReducer, photoDeleteReducer } from "./reducers/photoReducer";
import { eventCreateReducer, eventJoinReducer, eventListReducer, eventDetailsReducer } from "./reducers/eventReducer";
import { userPhotoListReducer } from './reducers/photoReducer';


const reducer = combineReducers({
  listUsers: listUsersReducer,
  photoList: photoListReducer,
  photoCreate: photoCreateReducer,
  photoDelete: photoDeleteReducer,
  userLogin: userLoginReducer,
  register: userRegisterReducer,
  editProfile:userEditProfileReducer,
  eventCreate: eventCreateReducer,
  eventJoin: eventJoinReducer,
  eventList: eventListReducer,
  eventDetails: eventDetailsReducer,
  userPhotoList: userPhotoListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store  = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;
