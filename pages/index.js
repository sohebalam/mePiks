import Avatar from "@mui/material/Avatar"

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
import { getPosts, paginatePosts } from "../redux/posts/postActions"
import { CircularProgress } from "@mui/material"
import Paginate from "../components/Paginate"

const theme = createTheme()

function Dashboard() {
  const [updatePost, setUpdatePost] = useState("")

  const router = useRouter()

  const paginate = useSelector((state) => state.paginate)
  const { loading, error, posts } = paginate

  console.log(posts)
  const dispatch = useDispatch()

  useEffect(() => {
    const number = 1
    dispatch(paginatePosts(number))
  }, [])

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
