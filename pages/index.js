import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState, useEffect } from "react"

import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { parseCookies } from "nookies"
import { useDispatch, useSelector } from "react-redux"

import PostCard from "../components/posts/PostCard"
import {
  clearData,
  getPosts,
  paginatePosts,
  postSearch,
} from "../redux/posts/postActions"
import { Button, CircularProgress } from "@mui/material"
import Paginate from "../components/Paginate"

const theme = createTheme()

function Dashboard() {
  const [updatePost, setUpdatePost] = useState("")

  const [search, setSearch] = useState("")

  const router = useRouter()

  const paginate = useSelector((state) => state.paginate)
  const { loading, error, posts } = paginate

  console.log(posts)
  const dispatch = useDispatch()

  useEffect(() => {
    const number = 1
    dispatch(paginatePosts(number))
  }, [])

  const clearSearch = async () => {}

  const handleSearch = async () => {
    router.push(`/src/search?search=${search}`)
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
        <Paginate />
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

export default Dashboard
