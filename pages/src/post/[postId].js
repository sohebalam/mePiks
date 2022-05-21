import { CardMedia, Divider, Grid, Paper, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "axios"

const postId = () => {
  const router = useRouter()

  const [post, setPost] = useState()

  const { postId } = router.query

  console.log(post)

  useEffect(() => {
    getPost()
  }, [postId])

  const getPost = async () => {
    try {
      const { data } = await axios.get(`/api/posts/post/${postId}`)

      setPost(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Grid sx={{ mt: "0.5rem" }}>
        <Paper
          sx={{ padding: "20px", borderRadius: "15px", mt: "1rem" }}
          elevation={6}
        >
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h3" component="h2">
                {post?.title}
              </Typography>
              <Typography variant="body1" component="p">
                {post?.message}
              </Typography>
              <Typography variant="h6" component="h6">
                {post?.creater}
              </Typography>
              <Divider xs={{ margin: "20px 0" }} />
              comment
              <Divider xs={{ margin: "20px 0" }} />
            </Grid>
            <Grid item xs={6}>
              <CardMedia
                component="img"
                height="400"
                image={post?.image}
                alt={post?.title}
              />
            </Grid>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: "0.5rem", mb: "2rem" }}
            >
              {/* {post?.tag?.map((tag) =>
                tag.length > 22
                  ? `#${tag.substring(22, 0)}  ` + "..."
                  : `#${tag}`
              )} */}
            </Typography>

            <div>
              <Typography gutterBottom variant="h5">
                You might also like:
              </Typography>
            </div>
          </Grid>
        </Paper>
      </Grid>
    </>
  )
}

export default postId
