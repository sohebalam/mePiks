import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import { useState, useEffect } from "react"
import axios from "axios"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import action from "axios"
import PostCard from "../../components/posts/PostCard"
import { clearData, paginatePosts } from "../../redux/posts/postActions"
import { Button, CircularProgress } from "@mui/material"
import Paginate from "../../components/SearchPaginate"
import { postSearch } from "../../redux/posts/postActions"

const Search = () => {
  const router = useRouter()

  const [updatePost, setUpdatePost] = useState("")

  const [newSearch, setNewSearch] = useState("")

  const [num, setNum] = useState(1)

  const searchPosts = useSelector((state) => state.searchPosts)
  const { loading, error, posts } = searchPosts

  const dispatch = useDispatch()

  const clearSearch = async () => {
    dispatch(clearData())
    dispatch(postSearch("", num))
    router.push("/")
  }

  useEffect(() => {
    const number = 1
    dispatch(paginatePosts(number))

    postSearch(search, num)
  }, [])

  useEffect(() => {
    dispatch(postSearch(search, num))
  }, [num])

  const { search } = router.query

  const handleSearch = async () => {
    router.push(`/src/search?search=${newSearch}`)
    dispatch(postSearch(newSearch, num))
  }

  return (
    <Grid container sx={{ mt: "1rem" }}>
      <Grid item xs={8}>
        <Grid container>
          {loading ? (
            <CircularProgress />
          ) : (
            posts?.data &&
            posts?.data?.map((post) => (
              <Box key={post._id} sx={{ m: 1 }}>
                <PostCard postData={post} setUpdatePost={setUpdatePost} />
              </Box>
            ))
          )}
        </Grid>
      </Grid>

      <Grid item xs={4}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="search"
          label="search"
          type="search"
          id="search"
          value={newSearch}
          onChange={(e) => setNewSearch(e.target.value)}
        />

        <Button variant="contained" fullWidth onClick={handleSearch}>
          Search
        </Button>
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          onClick={clearSearch}
          sx={{ mt: "0.5rem" }}
        >
          Clear Search
        </Button>

        <Paginate search={search} />
      </Grid>
    </Grid>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}

export default Search
