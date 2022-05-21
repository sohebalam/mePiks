import { combineReducers } from "redux"
import {
  deleteAPostReducer,
  paginateReducer,
  postCreateReducer,
  postGetReducer,
  searchPostsReducer,
} from "./posts/postReducers"

import { profileReducer } from "./userReducer"

const reducers = combineReducers({
  profile: profileReducer,
  postGet: postGetReducer,
  postCreate: postCreateReducer,
  deleteAPost: deleteAPostReducer,
  paginate: paginateReducer,
  searchPosts: searchPostsReducer,
})

export default reducers
