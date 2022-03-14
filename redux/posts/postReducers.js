import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  CREATE_POSTS_REQUEST,
  CREATE_POSTS_SUCCESS,
  CREATE_POSTS_FAIL,
} from "./postTypes"

export const postGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return { loading: true }
    case GET_POSTS_SUCCESS:
      return { loading: false, posts: action.payload }
    case GET_POSTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POSTS_REQUEST:
      return { loading: true }
    case CREATE_POSTS_SUCCESS:
      return { loading: false, post: action.payload }
    case CREATE_POSTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
