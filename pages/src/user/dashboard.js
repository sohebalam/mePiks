import Avatar from "@mui/material/Avatar"

import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState, useEffect } from "react"

import cookie from "js-cookie"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { parseCookies } from "nookies"
import { GoogleLoginButton } from "react-social-login-buttons"
import { loadUser } from "../../../redux/userAction"
import { useDispatch, useSelector } from "react-redux"
import Form from "../../../components/form/Form"

import PostCard from "../../../components/posts/PostCard"
import { getPosts } from "../../../redux/posts/postActions"

const theme = createTheme()

function Dashboard() {
  const router = useRouter()

  const postGet = useSelector((state) => state.postGet)
  const { loading, error, posts } = postGet

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
          {posts &&
            posts?.map((post) => (
              <Box key={post._id} sx={{ m: 1 }}>
                <PostCard postData={post} />
              </Box>
            ))}
        </Grid>
      </Grid>

      <Grid item xs={4}>
        <Form />
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
