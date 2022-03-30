import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { likePost, postDelete, postlike } from "../../redux/posts/postActions"
import { toast } from "react-toastify"
import { Box, Grid } from "@mui/material"
import ThumbUp from "@mui/icons-material/ThumbUp"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const PostCard = ({ postData, setUpdatePost }) => {
  const deleteAPost = useSelector((state) => state.deleteAPost)
  const { loading, error, post } = deleteAPost

  const [likes, setLikes] = useState(postData?.likes.length)

  useEffect(() => {}, [postDelete])

  const router = useRouter()

  console.log(router.pathname)

  const dispatch = useDispatch()
  const deletePost = async (_id) => {
    let answer = window.confirm("Are you sure you want to delete")
    if (!answer) {
      return
    }
    dispatch(postDelete(_id))
    toast.error("post deleted")
  }

  const profile = useSelector((state) => state.profile)
  const { dbUser } = profile

  const likePost = async (_id) => {
    const hasLiked = postData?.likes.includes(dbUser?._id)
    try {
      if (hasLiked) {
        setLikes(postData?.likes.length - 1)

        dispatch(postlike(_id))
      } else {
        setLikes(postData?.likes.length + 1)

        dispatch(postlike(_id))
      }

      console.log()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Card sx={{ maxWidth: 230 }}>
        <CardMedia
          component="img"
          height="200"
          image={postData?.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {postData?.title}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            {postData?.creater}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {postData?.message.length > 60
              ? postData?.message.substring(60, 0) + "..."
              : postData?.message}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: "0.5rem" }}
          >
            {postData?.tags.map((tag) =>
              tag.length > 22 ? `#${tag.substring(22, 0)}` + "..." : `#${tag}`
            )}
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: "-1rem" }}>
          <Grid container>
            <Grid container>
              <Button
                size="small"
                sx={{ ml: "0.1rem" }}
                onClick={() => likePost(postData?._id)}
              >
                Like
                <ThumbUp sx={{ ml: "0.25rem" }} />
              </Button>
              <Typography
                variant="body2"
                sx={{ mt: "0.5rem", color: "#ffcd38" }}
              >
                {likes === 0 ? "" : likes}{" "}
                {likes === 0 ? "No likes yet" : likes === 1 ? "like" : "likes"}
              </Typography>
            </Grid>
            <Grid
              container
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              {router.pathname === "/src/user/dashboard" && (
                <>
                  <Button
                    size="small"
                    onClick={() => deletePost(postData?._id)}
                    sx={{ mr: "0.5rem" }}
                  >
                    Delete
                    <DeleteIcon sx={{ ml: "0.25rem" }} />
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setUpdatePost(postData?._id)}
                  >
                    Update
                    <EditIcon sx={{ ml: "0.25rem" }} />
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  )
}

export default PostCard
