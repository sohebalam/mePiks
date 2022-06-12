import { Button, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { commentPost } from "../../redux/posts/postActions"

const Comment = ({ postId, user, postedComments }) => {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])

  const commentsRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    setComments(postedComments)
  }, [postedComments])

  const handleComment = async () => {
    const fullComment = `${user.name}: ${comment}`
    if (user && comment) {
      const newComment = await dispatch(commentPost(fullComment, postId))

      setComment("")
      setComments(newComment)
    }
    commentsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    })
  }

  return (
    <Grid container>
      <Grid
        item
        xs={4}
        sx={{ height: "200px", overflowY: "auto", mr: "0.5rem" }}
      >
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>
        <>
          {comments?.map((c, i) => (
            <>
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong>{c.split(": ")[0]}</strong>
                {c.split(":")[1]}
              </Typography>
            </>
          ))}
          <div ref={commentsRef} />
        </>
      </Grid>
      <Grid item xs={7.8}>
        <Typography gutterBottom variant="h6">
          Write a comment
        </Typography>
        <TextField
          fullWidth
          rows={4}
          variant="outlined"
          label="Comment"
          multiline={true}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <Button
          sx={{ mt: "1rem" }}
          fullWidth
          disabled={!comment.length}
          color="primary"
          variant="contained"
          onClick={handleComment}
        >
          Comment
        </Button>
      </Grid>
    </Grid>
  )
}

export default Comment
