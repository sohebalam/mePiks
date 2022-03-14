import { combineReducers } from "redux"
import { postCreateReducer, postGetReducer } from "./posts/postReducers"

import { profileReducer } from "./userReducer"

const reducers = combineReducers({
  profile: profileReducer,
  postGet: postGetReducer,
  postCreate: postCreateReducer,
})

export default reducers
