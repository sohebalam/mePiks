import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"

import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"

import { useState, useEffect } from "react"
import axios from "axios"

import { useSession, signIn, signOut, getSession } from "next-auth/react"

import { useRouter } from "next/router"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import FileBase from "react-file-base64"
import { createPosts, updatePost } from "../../redux/posts/postActions"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

function Form({ post }) {
  const [message, setMessage] = useState("")
  const [tags, setTags] = useState("")
  const [creater, setCreater] = useState("")
  const [title, setTitle] = useState("")
  const [selectedFile, setSelectedFile] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (post) {
      setMessage(post.message)
      setTags(post.tags)
      setCreater(post.creater)
      setTitle(post.title)
    }
  }, [post])

  // console.log(tags)

  const dispatch = useDispatch()
  const SubmitHandler = async (e) => {
    e.preventDefault()

    var memoryData = {
      tags,
      image: selectedFile,
      message,
      creater,
      title,
    }

    if (post) {
      dispatch(updatePost(post._id, memoryData))
      toast.success("post updated")
      var memoryData = {}
    } else {
      dispatch(createPosts(memoryData))
      toast.success("post created")
      var memoryData = {}
    }
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PhotoCameraIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Memory {post ? "Edit" : "Capture"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={SubmitHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="creater"
                  name="creater"
                  required
                  fullWidth
                  id="creater"
                  label="Creater"
                  autoFocus
                  value={creater}
                  onChange={(e) => setCreater(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Title"
                  label="Title"
                  name="Title"
                  autoComplete="titlee"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Message"
                  label="Message"
                  name="Message"
                  autoComplete="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="tags"
                  label="tags"
                  type="tags"
                  id="tags"
                  autoComplete="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value.split(","))}
                />
              </Grid>
              <Grid item xs={12}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setSelectedFile(base64)}
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                mt: 2,
                mb: 2,
                border: 1,
                borderRadius: 1,
                borderColor: "grey.400",
              }}
            ></Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, backgroundColor: "secondary.main" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Form
