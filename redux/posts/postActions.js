import axios from "axios"
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
  GET_PAGINATE_FAIL,
  GET_PAGINATE_SUCCESS,
  GET_PAGINATE_REQUEST,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_FAIL,
  CLEAR_DATA,
} from "./postTypes"

import { parseCookies } from "nookies"

const cookies = parseCookies()

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_POSTS_REQUEST })

    const { data } = await axios.get(`/api/posts/posts`)

    console.log("data", data)

    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPosts = (memoryData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POSTS_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    }

    const { data } = await axios.post(
      `/api/posts/create`,
      { memoryData },
      config
    )

    dispatch({
      type: CREATE_POSTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const postDelete = (_id) => async (dispatch) => {
  try {
    dispatch({ type: POST_DELETE_REQUEST })
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    }

    const { data } = await axios.delete(`/api/posts/${_id}`, config)

    dispatch({
      type: POST_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePost = (_id, memoryData) => async (dispatch) => {
  try {
    dispatch({ type: POST_UPDATE_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/posts/${_id}`,
      { memoryData },
      config
    )

    dispatch({
      type: POST_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const postlike = (_id) => async (dispatch) => {
  try {
    dispatch({ type: POST_UPDATE_REQUEST })

    console.log("action", cookies.token)

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    }

    const { data } = await axios.patch(`/api/posts/likes/${_id}`, {}, config)

    dispatch({
      type: POST_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const paginatePosts = (number) => async (dispatch) => {
  try {
    dispatch({ type: GET_PAGINATE_REQUEST })

    const { data } = await axios.get(`/api/posts/paginate/${number}`)

    console.log(data)

    dispatch({
      type: GET_PAGINATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_PAGINATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const postSearch = (search, page) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_POSTS_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(
      `/api/posts/search?search=${search}`,
      { page },
      config
    )

    console.log(data)

    dispatch({
      type: SEARCH_POSTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SEARCH_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getPostBySearch = (tags) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_POSTS_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(
      `/api/posts/search?search=${tags}`,
      {},
      config
    )

    console.log(data)

    dispatch({
      type: SEARCH_POSTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SEARCH_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const clearData = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_DATA })

    const data = ""

    dispatch({
      type: CLEAR_DATA,
      payload: data,
    })
  } catch (error) {
    console.log(error)
  }
}
