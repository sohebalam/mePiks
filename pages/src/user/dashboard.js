import * as React from "react"
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
import axios from "axios"
import cookie from "js-cookie"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { parseCookies } from "nookies"
import { GoogleLoginButton } from "react-social-login-buttons"
import { loadUser } from "../../../redux/userAction"
import { useDispatch } from "react-redux"
import Form from "../../../components/form/Form"

import PostCard from "../../../components/posts/PostCard"

const theme = createTheme()

function Dashboard() {
  const [postData, setPostData] = useState()
  const router = useRouter()

  const cookies = parseCookies()

  const { data: session } = useSession()

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    try {
      const { data } = await axios.get(`/api/posts/posts`)

      setPostData(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Grid container sx={{ mt: "1rem" }}>
      <Grid item xs={8}>
        <Grid container>
          {postData &&
            postData?.map((post) => (
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
