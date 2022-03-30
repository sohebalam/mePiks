import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  CREATE_POSTS_REQUEST,
  CREATE_POSTS_SUCCESS,
  CREATE_POSTS_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAIL,
  GET_PAGINATE_REQUEST,
  GET_PAGINATE_SUCCESS,
  GET_PAGINATE_FAIL,
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

export const deleteAPostReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true }
    case POST_DELETE_SUCCESS:
      return { loading: false, post: action.payload }
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const postUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_UPDATE_REQUEST:
      return { loading: true }
    case POST_UPDATE_SUCCESS:
      return { loading: false, post: action.payload }
    case POST_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const paginateReducer = (state = {}, action) => {
  // console.log("reduer", action.payload)
  switch (action.type) {
    case GET_PAGINATE_REQUEST:
      return { loading: true }
    case GET_PAGINATE_SUCCESS:
      // console.log("reduer", action.payload)
      return { loading: false, posts: action.payload }
    case GET_PAGINATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
