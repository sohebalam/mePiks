import Post from "../../../model/postModel"
import connectDB from "../../../connectDB"
import Authenticated from "../../../lib/middleware/isAuth"
connectDB()

export default async (req, res) => {
  console.log(req.body)
  if (req.method === "POST") {
    const post = await Post.findById(req?.body?.postId)

    post?.comments.push(req?.body?.fullComment)

    const updatedPost = await Post.findByIdAndUpdate(req?.body?.postId, post, {
      new: true,
    })

    res.json(updatedPost)
  }
}
