import Pagination from "@mui/material/Pagination"
import PaginationItem from "@mui/material/PaginationItem"
import { styled } from "@mui/material/styles"
import Paper from "@mui/material/Paper"
import axios from "axios"
import { paginatePosts } from "../redux/posts/postActions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { postSearch } from "../redux/posts/postActions"

const Paginate = ({ search }) => {
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

  const handleChange = async (num) => {
    // if (number === 0) number = 1
    try {
      dispatch(postSearch(search, num))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Item>Please Select Page</Item>
      <Paper sx={{ borderRadius: 4, mt: "1rem" }} elevation={6}>
        <Pagination
          color="primary"
          count={(posts && Number(posts?.count)) || 1}
          onChange={(e) => handleChange(e.target.textContent)}
          renderItem={(item) => <PaginationItem {...item} />}
        />
      </Paper>
    </>
  )
}

export default Paginate
