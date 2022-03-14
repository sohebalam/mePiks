import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const PostCard = ({ postData }) => {
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
          <Button size="small">Like</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default PostCard
