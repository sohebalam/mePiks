import {
  Divider,
  Grid,
  Paper,
  Typography,
  CardMedia,
  CircularProgress,
  Card,
} from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getPostBySearch } from "../../../redux/posts/postActions"
import { ThumbUp } from "@mui/icons-material"
import Comment from "../../../components/posts/Comment"
import { getSession } from "next-auth/react"
import { parseCookies } from "nookies"

const postId = ({ session }) => {
  const router = useRouter()

  const cookies = parseCookies()

  const [post, setPost] = useState()

  const { postId } = router.query

  const searchPosts = useSelector((state) => state.searchPosts)
  const { loading, error, posts: resPosts } = searchPosts

  const profile = useSelector((state) => state.profile)
  const { dbUser } = profile

  const user = dbUser
    ? dbUser
    : cookies?.user
    ? JSON.parse(cookies?.user)
    : session?.user

  const dispatch = useDispatch()

  useEffect(() => {
    getPost()
  }, [postId])

  useEffect(() => {
    if (post) {
      dispatch(getPostBySearch({ tags: post?.tags.join(",") }))
    }
  }, [post])

  const getPost = async () => {
    try {
      const { data } = await axios.get(`/api/posts/post/${postId}`)

      setPost(data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(post?.comments[0])

  const recommendedPosts =
    resPosts && resPosts?.data?.filter((rPost) => post?._id !== rPost._id)

  const openPost = async (_id) => {
    router.push(`/src/post/${_id}`)
  }

  const commentsRef = useRef()

  commentsRef?.current?.scrollIntoView({
    block: "end",
    behavior: "smooth",
  })
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

              <Comment
                postId={post?._id}
                user={user}
                postedComments={post?.comments}
              />

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
              <Grid container>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <>
                    {recommendedPosts &&
                      recommendedPosts.map((rPost) => (
                        <Grid
                          item
                          sx={{
                            margin: "0.5rem",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                          }}
                          onClick={() => openPost(rPost._id)}
                          key={rPost._id}
                        >
                          <Card sx={{ maxWidth: 300, padding: "1rem" }}>
                            <Typography variant="h6" gutterBottom>
                              {rPost.title}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              {rPost.name}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                              {rPost.message}
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              color="primary"
                            >
                              LIKES
                              <ThumbUp
                                sx={{
                                  ml: "0.25rem",
                                  mr: "0.25rem",
                                  mb: "-0.25rem",
                                }}
                                color="primary"
                              />
                              {rPost.likes.length}
                            </Typography>
                            <CardMedia
                              component="img"
                              height="200"
                              image={rPost.image}
                              alt={rPost.title}
                            />
                          </Card>
                        </Grid>
                      ))}
                  </>
                )}
              </Grid>
            </div>
          </Grid>
        </Paper>
      </Grid>
    </>
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

export default postId
