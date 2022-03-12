import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const PostCard = ({ postData }) => {
  return (
    <>
      <Card sx={{ maxWidth: 250 }}>
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
          <Typography gutterBottom variant="h5" component="div">
            {postData?.creater}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {postData?.message}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {postData?.tags.map((tag) => `#${tag}`)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Like</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default PostCard
