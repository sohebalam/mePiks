import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Pagination, PaginationItem, Paper } from "@mui/material"
// import { getPosts } from "../actions/posts"
import { styled } from "@mui/material/styles"
import axios from "axios"
import { paginatePosts } from "../redux/posts/postActions"
const Paginate = () => {
  //   const [currentPage, setCurrentPage] = useState(1)
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }))

  const dispatch = useDispatch()

  const paginate = useSelector((state) => state.paginate)
  const { loading, error, posts } = paginate

  useEffect(() => {
    const number = 1
    dispatch(paginatePosts(number))
  }, [])

  const handleChange = async (number) => {
    if (number === 0) number = 1

    dispatch(paginatePosts(number))
  }

  return (
    <Paper
      xs={{ borderRadius: 4, marginTop: "1rem", padding: "16px" }}
      elevation={6}
    >
      <Item>Select Posts</Item>
      <Pagination
        sx={{ justifyContent: "space-around" }}
        count={Number(posts?.numberOfPages) || 1}
        onChange={(e) => handleChange(e.target.textContent)}
        variant="outlined"
        color="primary"
        renderItem={(item) => <PaginationItem {...item} />}
      />
    </Paper>
  )
}

export default Paginate
