import { combineReducers } from "redux"
import {
  deleteAPostReducer,
  postCreateReducer,
  postGetReducer,
} from "./posts/postReducers"

import { profileReducer } from "./userReducer"

const reducers = combineReducers({
  profile: profileReducer,
  postGet: postGetReducer,
  postCreate: postCreateReducer,
  deleteAPost: deleteAPostReducer,
})

export default reducers
