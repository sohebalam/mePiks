import Avatar from "@mui/material/Avatar"

import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState, useEffect } from "react"

import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { parseCookies } from "nookies"
import { useDispatch, useSelector } from "react-redux"
import Paginate from "../components/Paginate"

import PostCard from "../components/posts/PostCard"
import { getPosts } from "../redux/posts/postActions"
import { CircularProgress } from "@mui/material"

const theme = createTheme()

function Dashboard() {
  const [updatePost, setUpdatePost] = useState("")

  const router = useRouter()

  const paginate = useSelector((state) => state.paginate)
  const { loading, error, posts } = paginate

  const post = posts?.data?.filter((post) => post._id === updatePost)

  const postData = post && post[0]

  const cookies = parseCookies()
  const dispatch = useDispatch()

  const { data: session } = useSession()

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <Grid container sx={{ mt: "1rem" }}>
      <Grid item xs={8}>
        <Grid container>
          {loading ? (
            <CircularProgress />
          ) : (
            posts &&
            posts?.data?.map((post) => (
              <Box key={post._id} sx={{ m: 1 }}>
                <PostCard postData={post} setUpdatePost={setUpdatePost} />
              </Box>
            ))
          )}
        </Grid>
      </Grid>

      <Grid item xs={4} sx={{ mt: "0.5rem" }}>
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
